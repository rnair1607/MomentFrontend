import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import styles from './allMoments.module.css';
import editIcon from '../../assets/editIcon.png';
import trashIcon from '../../assets/trashIcon.png';

const AllMoments = () => {
  const navigate = useNavigate();
  const [moments, setmoments] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchMoments = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        'http://localhost:8000/api/moment/allMoments'
      );
      setmoments(res.data);
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
    setloading(false);
  };

  useEffect(() => {
    fetchMoments();
  }, []);

  const deleteMoment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/moment/deleteMoment/${id}`);
      toast.success('Moment deleted', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchMoments();
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

  const editMoment = (id) => {
    navigate(`/protected/edit/${id}`);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.topBar}>Moments</div>
          <div className={styles.contentArea}>
            <div className={styles.formContainer}>
              {!moments.length ? (
                <center>
                  <h1>No moments to show</h1>
                </center>
              ) : (
                <table>
                  <tr>
                    <th>Sr.No</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Action</th>
                  </tr>
                  <tbody>
                    {moments.map((moment, index) => (
                      <tr key={moment._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={moment.image.url}
                            className={styles.momentImage}
                            alt={moment.image.public_id}
                          />
                        </td>
                        <td>{moment.title}</td>
                        <td>
                          <div className={styles.tagsContainer}>
                            {moment.tags.map((tag) => (
                              <div className={styles.tagPill}>
                                {tag.displayValue}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className={styles.actionContainer}>
                            <img
                              src={editIcon}
                              alt="edit"
                              onClick={() => editMoment(moment._id)}
                            />
                            <img
                              src={trashIcon}
                              alt="delete"
                              onClick={() => deleteMoment(moment._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllMoments;
