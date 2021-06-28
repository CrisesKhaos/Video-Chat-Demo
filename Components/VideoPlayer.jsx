import React  ,{useContext}from 'react'
import {Grid ,Typography , Paper} from "@material-ui/core"
import {makeStyles } from "@material-ui/core/styles"

import {SocketContext} from "../SocketContext"

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));
function VideoPlayer() {
    const { name, callAccepted, myVid, userVid, callEnded, stream, call} = useContext(SocketContext);
    const classes= useStyles();
    return (
        <Grid container className = {classes.gridContainer}>
           
            {/*My  video*/}
            {stream && (
            <Paper className = {classes.paper}>
                <Grid item xs = {12} md = {6}>
                    <Typography variant = "h5" gutterBottom >{ name ||"Me :D"}</Typography>
                    <video playsInline muted ref = {myVid} autoPlay className = {classes.video}/>
                </Grid>
            </Paper>)
            }

            {/*Other guys video*/}
            {callAccepted && !callEnded &&(
            <Paper className = {classes.paper}>
                <Grid item xs = {12} md = {6}>
                    <Typography variant = "h5" gutterBottom >{ call.name ||"Other"}</Typography>
                    <video playsInline  ref = {userVid} autoPlay className = {classes.video}/>
                </Grid>
            </Paper>)}  
            
        </Grid>
    )
}

export default VideoPlayer
