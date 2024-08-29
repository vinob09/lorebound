import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkCreateNote, thunkUpdateNote, thunkGetNote } from '../../redux/notes';
import './NoteForm.css';

const NoteForm = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const note = useSelector(state => state.notes.note);
    const user = useSelector(state => state.session.user);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});

    // fetch note if editing or set isLoaded when creating
    useEffect(() => {
        if (noteId) {
            dispatch(thunkGetNote(noteId)).then(() => setIsLoaded(true));
        } else {
            setIsLoaded(true);
        }
    }, [dispatch, noteId]);

    // populate form fields if editing note
    useEffect(() => {
        if (noteId && note) {
            setTitle(note.title);
            setContent(note.content);
            setUrl(note.url);
        }
    }, [noteId, note]);


    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate image extensions and format
        const isValidImage = (url) => {
            const extension = url.split('.').pop().toLowerCase();
            return ['png', 'jpg', 'jpeg'].includes(extension);
        };

        const isValidURL = (string) => {
            try {
                new URL(string);
                return true;
            } catch (err) {
                return false;
            }
        };

        // error validations
        const validateForm = () => {
            const newErrors = {};
            if (!title) newErrors.title = 'Title is required.';
            if (title.length > 255) newErrors.title = 'Title must be less than 255 characters.';
            if (url && url.length > 100) newErrors.url = 'Image URL needs to be less than 100 characters.';
            if (url && (!isValidImage(url) || !isValidURL(url))) newErrors.url = 'Image URL needs to end in png, jpg or jpeg.';
            return newErrors;
        };

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const noteData = { title, content, url };

        // creating note
        if (!noteId) {
            const result = await dispatch(thunkCreateNote(noteData));

            if (result.error) {
                setErrors(result.error);  
            } else {
                navigate(`/client/${user.id}/notes/${result.id}`);
            }
        } else {
            // editing note
            await dispatch(thunkUpdateNote(noteId, noteData));
            navigate(`/client/${user.id}/notes/${noteId}`);
        }
    };

    // clear error messages on input change
    const handleInputChange = (field) => (e) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        if (field === "title") setTitle(e.target.value);
        if (field === "url") setUrl(e.target.value);
        if (field === "content") setContent(e.target.value);
    };

    // handle cancel editing or creating
    const handleCancel = () => {
        navigate(`/client/${user.id}/notes`);
    };


    return isLoaded ? (
        <div>
            <div className="note-form-container">
                <h1>{noteId ? "Edit Note" : "Create Note"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleInputChange("title")}
                            required
                        />
                        {errors.title && <p className="error-message">{errors.title}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Image URL</label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={handleInputChange("url")}
                        />
                        {errors.url && <p className="error-message">{errors.url}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleInputChange("content")}
                        />
                        {errors.content && <p className="error-message">{errors.content}</p>}
                    </div>
                    <button type="submit" className="btn-save">Save</button>
                    <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    )
};

export default NoteForm;
