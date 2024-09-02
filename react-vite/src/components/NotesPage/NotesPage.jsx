import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkAllNotes, thunkDeleteNote } from '../../redux/notes';
import ReactPaginate from 'react-paginate';
import Tiles from '../Tiles';
import './NotesPage.css';

const NotesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.allNotes);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const notesPerPage = 8;

    const fetchNotes = useCallback((page) => {
        dispatch(thunkAllNotes(page, notesPerPage))
            .then(data => {
                if (data) {
                    setTotalPages(data.pages);
                    setIsLoaded(true);
                }
            })
            .catch(err => console.error("Failed to fetch notes:", err));
    }, [dispatch, notesPerPage]);

    useEffect(() => {
        fetchNotes(currentPage + 1);
    }, [fetchNotes, currentPage]);


    // handle tiles click into details
    const handleClick = (noteId) => {
        if (user && user.id) {
            navigate(`/client/${user.id}/notes/${noteId}`);
        }
    };

    // handle creating new note
    const handleNewNote = () => {
        navigate(`/client/${user.id}/note/new`)
    };

    // handle page click
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    // handle delete note and refresh
    const handleDeleteNote = (noteId) => {
        dispatch(thunkDeleteNote(noteId)).then(() => {
            const remainingNotes = notes.length - 1;
            const newTotalPages = Math.ceil(remainingNotes / notesPerPage);
            if (currentPage + 1 > newTotalPages && currentPage > 0) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchNotes(currentPage + 1);
            }
        })
    };

    return isLoaded ? (
        <div className='notes-page'>
            <h1>All Notes Page</h1>
            <Link onClick={handleNewNote}>Create New Note</Link>
            {notes.length > 0 ? (
                <>
                    <Tiles items={notes} type="note" onTileClick={handleClick} onDelete={handleDeleteNote} />
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </>
            ) : (
                <p>No notes available.</p>
            )}
        </div>
    ) : (
        <h1>Loading...</h1>
    )
};

export default NotesPage;
