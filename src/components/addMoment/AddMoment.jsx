import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Line } from 'rc-progress';
import { useDropzone } from 'react-dropzone';
import { TagInput } from 'reactjs-tag-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import styles from './addMoment.module.css';
import SubmitButton from '../../components/button/SubmitButton';
import uploadIcon from '../../assets/upload.png';
import imagePlaceholder from '../../assets/imagePlaceholder.png';
import cross from '../../assets/cross.png';
import deleteTag from '../../assets/deleteTag.png';
import tagDeletejpg from '../../assets/tagDeletejpg.jpg';

const AddMoment = ({ edit }) => {
  const params = useParams();
  const navigate = useNavigate();
  const fileUpload = useRef(null);
  const [title, settitle] = useState();
  const [titleerror, settitleerror] = useState(false);
  const [fileInput, setfileInput] = useState('');
  const [previewSource, setpreviewSource] = useState('');
  const [image, setimage] = useState();
  const [uploadPercentage, setuploadPercentage] = useState(0);
  const [fileSize, setfileSize] = useState(0);
  const [tags, settags] = useState([]);
  const [momentId, setmomentId] = useState();

  const fetchMoment = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/moment/getMoment/${id}`
      );
      settitle(res.data.title);
      setpreviewSource(res.data.image.url);
      setimage(res.data.image);
      await res.data.tags.forEach((tag) => {
        delete tag._id;
      });
      setmomentId(res.data._id);
      settags(res.data.tags);
      setfileSize(res.data.image.fileSize);
      setuploadPercentage(100);
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);

    setfileSize(Math.round((acceptedFiles[0].size / 1024) * 100) / 100);
    uploadImage(acceptedFiles[0]);
  }, []);

  const uploadImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/fileUpload/',
          {
            data: reader.result,
          },
          uploadOptions
        );
        setimage({ ...res.data, fileSize: fileSize });
        setpreviewSource(res.data.url);
        toast.success('Image uploaded!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setimage(null);
        setpreviewSource('');
        console.log(error.message);
      }
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  useEffect(() => {
    if (edit) {
      // console.log(params.id);
      fetchMoment(params.id);
    }
  }, [edit]);

  const uploadOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percent = Math.floor((loaded * 100) / total);
      setuploadPercentage(percent);
    },
  };

  const uploadClick = () => {
    fileUpload.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setfileSize(Math.round((file.size / 1024) * 100) / 100);
    uploadImage(file);
  };

  const deletePicture = async () => {
    if (!previewSource) return;
    try {
      const res = await axios.post(
        'http://localhost:8000/api/fileUpload/delete',
        image
      );

      if (res.data.result === 'ok') {
        toast.success('Image deleted!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setpreviewSource('');
        setimage('');
        setuploadPercentage(0);
        setfileSize(0);
      }
    } catch (error) {
      toast.error('Some error', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log(error);
    }
  };

  const onTagsChanged = (tags) => {
    settags(tags);
  };

  const submitMoment = async () => {
    settitleerror(false);
    if (!title) {
      settitleerror(true);
      return;
    }
    if (!previewSource) {
      toast.error('Please upload an image', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!tags.length) {
      toast.error('Please add at least one tag', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    console.log({ title, image, tags });

    try {
      if (!edit) {
        const res = await axios.post(
          'http://localhost:8000/api/moment/create',
          {
            title,
            image,
            tags,
          }
        );

        toast.success('Moment added!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const res = await axios.put(
          `http://localhost:8000/api/moment/updateMoment/${momentId}`,
          {
            title,
            image,
            tags,
          }
        );

        toast.success('Moment updated!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      navigate('/protected/');
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
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
                    <TagInput
                      wrapperStyle={`
                      font-weight: 400;
                      font-size: medium;
                      position: inherit;  
                      background: none;
                      box-shadow: none;
                      font-family: 'Maven Pro',sans-serif !important;
                      width: 86%;
                      padding:0;
                      transform:none;
                      `}
                      inputStyle={`
                      border: none;
                      outline: none;
                      border-bottom: 2px solid #dbdbdb;
                      background: none;
                      `}
                      tagStyle={`
                      border: 1px solid #24BE8B;
                      outline: none;
                      background: white;
                      color: #001B30;
                      border-radius: 24px;
                      `}
                      tagDeleteStyle={`color:black`}
                      tags={tags}
                      onTagsChanged={onTagsChanged}
                      placeholder="Add a tag"
                    />
                    {/* <input
                      className={titleerror ? styles.inputerror : styles.input}
                      type="text"
                      placeholder="Sample tags"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                    /> */}
                  </div>
                </div>

                <div className={styles.previewContainer}>
                  <img
                    className={styles.previewImg}
                    src={previewSource || imagePlaceholder}
                    alt="preview"
                  />
                  <div className={styles.progressbarContainer}>
                    <Line
                      percent={uploadPercentage}
                      strokeWidth="1"
                      strokeColor="#001B30"
                    />
                    <div className={styles.progressDetailsContainer}>
                      <div className={styles.percentage}>
                        {uploadPercentage}% done
                      </div>
                      <div>{fileSize ? fileSize + 'kb' : '0kb'}</div>
                    </div>
                  </div>
                  <img
                    src={cross}
                    style={{ cursor: 'pointer' }}
                    onClick={deletePicture}
                    alt="delete image"
                  />
                </div>
              </div>
              <div className={styles.formColumn2}>
                <div
                  className={
                    isDragActive
                      ? styles.uploadControllerActive
                      : styles.uploadController
                  }
                  {...getRootProps()}
                >
                  <img src={uploadIcon} alt="Upload" onClick={uploadClick} />
                  <div className={styles.drag}>Drag and drop a file</div>
                  <div className={styles.or}>or</div>
                  <SubmitButton title="Browse" onClick={uploadClick} />
                  {isDragActive ? (
                    <input {...getInputProps()} />
                  ) : (
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileInputChange}
                      value={fileInput}
                      accept="image/*"
                      hidden
                      ref={fileUpload}
                    />
                  )}
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
