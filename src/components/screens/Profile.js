import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import XMLParser from 'react-xml-parser';
// import flickr from 'flickr-sdk'

const Profile = () => {
    // eslint-disable-next-line
    const [userProfile, setProfile] = useState(null)
    const [flickr, setFlickr] = useState([])

    // console.log('flickr ', flickr);

    useEffect(() => {
        fetch('http://localhost:8081/test',{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setProfile(result)
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:8081/flickr',{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.text())
        .then(result => {
            // console.log('result ', result);
            let xml = new XMLParser().parseFromString(result)
            setFlickr(xml)
        })
    }, [])

    return (
        <>
            <div className="container" style={{ marginTop:"50px" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Profile</TableCell>
                                <TableCell align="right">Register Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {userProfile ?
                                    <TableRow
                                        key={userProfile.user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {userProfile.user.username}
                                        </TableCell>
                                        <TableCell component="th" align="right" scope="row">
                                            {userProfile.user.register_date}
                                        </TableCell>
                                    </TableRow>
                                    : <h2>Loading...!</h2>
                                }
                        </TableBody>
                    </Table>
                    <Table>
                        {flickr.name}
                    </Table>
                </TableContainer>

            </div>
        </>
    )
}

export default Profile