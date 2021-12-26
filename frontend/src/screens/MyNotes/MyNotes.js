import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Accordion,Badge, Button, Card } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { useDispatch, useSelector } from 'react-redux';
import {deleteNoteAction, listNote} from '../../actions/notesActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import {useNavigate} from 'react-router-dom';
import { NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS } from '../../constants/notesConstants'

const MyNotes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const noteList = useSelector(state => state.noteList)
    const { loading, notes, error } = noteList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    useEffect(() => {
        if(!userInfo)
        {
            navigate('/')
        }
        dispatch(listNote());

    }, [dispatch, userInfo])


    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {

            dispatch(deleteNoteAction(id))
        }
        console.log("deleted")
        window.location.reload(false)
        // navigate('/mynotes')
    }
    return (
        <MainScreen title={`Welcome ${userInfo && userInfo.name}....`}>
            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading/>}
            {
                notes?.reverse().map(note => (
                    <Accordion defaultActiveKey="1"  key={note._id}>
                    <Accordion.Item eventKey="0">
                    <Card style={{ margin: 10 }}>
                        <Card.Header style={{ display: "flex" }}>

                            <span
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                    flex: 1,
                                    cursor: "pointer",
                                    alignSelf: "center",
                                    fontSize: 18
                                }}
                            >
                                <Accordion.Header>{note.title}</Accordion.Header>
                                </span>

                            <div>
                                <Button variant="danger" className="mx-2"
                                    onClick={() => deleteHandler(note._id)}>Delete</Button>
                            </div>
                        </Card.Header>
                        <Accordion.Body>
                        <Card.Body>

                            <h4>
                                <Badge bg="success">Category - {note.category}</Badge>
                            </h4>

                            <blockquote className="blockquote mb-0">
                                <p> {note.content} </p>
                                <footer className="blockquote-footer">
                                    Created on {" "}
                                    {note.createdAt.substring(0, 10)}
                                </footer>
                            </blockquote>
                        </Card.Body>
                        </Accordion.Body>
                    </Card>
                    </Accordion.Item>
                    </Accordion>
                ))
            }



        </MainScreen>

    )
}

export default MyNotes
