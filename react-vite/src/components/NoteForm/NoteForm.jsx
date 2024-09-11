import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkCreateNote, thunkUpdateNote, thunkGetNote } from '../../redux/notes';
import QuillEditor from './QuillEditor';
import Loader from '../Loader/Loader';
import 'react-quill/dist/quill.snow.css';
import './NoteForm.css';

const NoteForm = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const note = useSelector(state => state.notes.note);
    const user = useSelector(state => state.session.user);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageLoading, setImageLoading] = useState(false);

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
            setFile(null);
        }
    }, [noteId, note]);

    const validateFields = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required.";
        return newErrors;
    };


    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateFields();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (file) {
            formData.append("url", file);
        }
        if (removeImage) {
            formData.append("removeImage", "true");
        }

        setIsLoaded(false);
        setImageLoading(true);

        // creating note
        if (!noteId) {
            const result = await dispatch(thunkCreateNote(formData));

            if (result.error) {
                setErrors(result.error);
                setIsLoaded(true);
            } else {
                navigate(`/client/${user.id}/notes/${result.id}`);
            }
        } else {
            // editing note
            const result = await dispatch(thunkUpdateNote(noteId, formData));

            if (result && result.error) {
                setErrors(result.error);
                setIsLoaded(true);
            } else {
                navigate(`/client/${user.id}/notes/${noteId}`);
            }
        }
        setImageLoading(false);
    };

    // clear error messages on input change
    const handleInputChange = (field) => (e) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        if (field === "title") setTitle(e.target.value);
        if (field === "url") setFile(e.target.files[0]);
        if (field === "content") setContent(e.target.value);
    };

    // handle cancel editing or creating
    const handleCancel = () => {
        navigate(`/client/${user.id}/notes`);
    };


    return isLoaded ? (
        <div className="note-form-wrapper">
            <div className="note-form-container">
                <h1>{noteId ? "Edit Note" : "Create Note"}</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        <label htmlFor="url">Image File</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange("url")}
                        />
                        {errors.url && <p className="error-message">{errors.url}</p>}
                    </div>
                    {noteId && note?.url && (
                        <div className="form-group checkbox-group">
                            <label htmlFor="removeImage">Remove existing image</label>
                            <input
                                type="checkbox"
                                id="removeImage"
                                checked={removeImage}
                                onChange={(e) => setRemoveImage(e.target.checked)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <QuillEditor content={content} setContent={setContent} placeholder = 'Capture your journey here...'/>
                        {errors.content && <p className="error-message">{errors.content}</p>}
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                    {imageLoading && <p>Loading...</p>}
                </form>
            </div>
        </div>
    ) : (
        <Loader />
    )
};

export default NoteForm;
