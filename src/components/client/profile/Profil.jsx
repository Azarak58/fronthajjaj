import React from "react";
import './Profil.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  return (
    <div className="min-vh-80 d-flex align-items-center top-0 start-0 w-100  justify-content-center">
      <div className="profile-cardprofil">
        {/* Image en haut */}
        <img
          src="./imagess/image1.jpg"
          alt="Profile"
          className="profile-photoprofil"
        />
        {/* Informations utilisateur en dessous */}
        <div className="profile-headerprofil">
          <div><strong>Name:</strong> jhjhjhjhj</div>
          <div><strong>First Name:</strong> hhjhjh</div>
          <div><strong>Email:</strong> kbhghghj</div>
          <div><strong>Address:</strong> jggfgfg</div>
        </div>

        <div className="buttonprofil">
          {/* Boutons pour ouvrir les modals */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Open modal
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New Information
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    {/* Champ 1 */}
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Recipient:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>

                    

                    {/* Champ 3 */}
                    <div className="mb-3">
                      <label htmlFor="phone-number" className="col-form-label">
                        Phone Number:
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone-number"
                      />
                    </div>

                        

                    {/* Champ 5 */}
                    <div className="mb-3">
                      <label htmlFor="city" className="col-form-label">
                        City:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                      />
                    </div>

                    {/* Champ 6 */}
                    <div className="mb-3">
                      <label htmlFor="occupation" className="col-form-label">
                        Occupation:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="occupation"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-footerprofil">
          <div>Additional Info or Buttons</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
