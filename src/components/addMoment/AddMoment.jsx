import React, { useState } from 'react';

import styles from './addMoment.module.css';
import SubmitButton from '../../components/button/SubmitButton';
import uploadIcon from '../../assets/upload.png';

const AddMoment = ({}) => {
  const [title, settitle] = useState();
  const [titleerror, settitleerror] = useState(false);

  const submitMoment = () => {};
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topBar}>Add new moment</div>
        <div className={styles.contentArea}>
          <div className={styles.formContainer}>
            <div className="row w-100">
              <div className={styles.inputContainer}>
                <div className={styles.label}>Title</div>
                <div className={styles.inputWrapper}>
                  <input
                    className={titleerror ? styles.inputerror : styles.input}
                    type="text"
                    placeholder="Sample title"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formSecondRow}>
              <div className={styles.formColumn1}>
                <div className={styles.inputContainer}>
                  <div className={styles.label}>Tags</div>
                  <div className={styles.inputWrapper}>
                    <input
                      className={titleerror ? styles.inputerror : styles.input}
                      type="text"
                      placeholder="Sample tags"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formColumn2}>
                <div className={styles.uploadController}>
                  <img src={uploadIcon} alt="Upload" />
                  <div className={styles.drag}>Drag and drop a file</div>
                  <div className={styles.or}>or</div>
                  <SubmitButton title="Browse" onClick={() => {}} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formControl}>
            <SubmitButton title="Submit" onClick={submitMoment} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMoment;
