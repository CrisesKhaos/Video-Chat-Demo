import React, { useState, useEffect, useRef, createContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("https://crisey-vc-test1.herokuapp.com/");

const ContextProvider = ({ children }) => {
  const [stream, setstream] = useState(null);
  const [me, setme] = useState("");
  const [call, setcall] = useState({});
  const [callAccepted, setcallAccepted] = useState(false);
  const [callEnded, setcallEnded] = useState(false);
  const [name, setname] = useState("");

  const myVid = useRef();
  const userVid = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((crStream) => {
        setstream(crStream);
        myVid.current.srcObject = crStream;
      });

    socket.on("me", (id) => {
      setme(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log("bruh");
      setcall({ isRecieved: true, from, name: callerName, signal });
      console.log(call);
    });
  }, []);

  const answerCall = () => {
    setcallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVid.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        userToCall: id,
        from: me,
        name,
      });
    });
    console.log(id);
    console.log("hihi call user function");
    peer.on("stream", (currentStream) => {
      userVid.current.srcObject = currentStream;
    });
    console.log(call);
    socket.on("callAccepted", (signal) => {
      setcallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setcallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVid,
        userVid,
        stream,
        name,
        setname,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
