import styles from './SingleNote.module.css';

function SingleNote({ id, description, createdAt, onDeleteHandler }) {
    //todo extract pena nd trash in component??
    return (
        <div className={styles["notes-all-info-wrapper"]}>
            <div className={styles["notes-all-info-left"]}>
                <p className={styles["notes-all-info"]}>
                    {createdAt}
                </p>
                <div className={styles["notes-all-icon-wrapper"]}>
                    <i className="fa-solid fa-pen"></i>
                    <i onClick={() => onDeleteHandler(id)} className="fa-solid fa-trash"></i>
                </div>
            </div>
            <div className="notes-all-info-right">
                <p className={styles["notes-all-description"]}>
                    {description}
                </p>
            </div>
        </div>
    );
}

//todo onClick={() => onShowFormHandler(id)}

export default SingleNote;