import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {uploadFile, post} from "../config/requisitions";
import {getUser, setUser} from "../config/session";
import { toast } from 'react-toastify';
import { CircleLoader } from "react-spinners";

const ImageCropper = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [format, setFormat] = useState(null);
  const [croppedImage, setCroppedImage] = useState('');
  const [cropper, setCropper] = useState();
  const [loading, setLoading] = useState(false);

  const handleInitialized = (instance) => {
    setCropper(instance);
  };


  const errorMessage = (m)=>{
    toast.error(m, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  const successMessage = (m)=>{
    toast.success(m, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    let selectedFile = e.target.files[0]
    const fileName = selectedFile.name;

    // Get the file extension (format)
    const fileExtension = fileName.split('.').pop();
    setFormat(fileExtension)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };


  const handleSave = () => {
    const canvas = cropper.getCroppedCanvas();
    const croppedImage = canvas.toDataURL("image/"+format);
    console.log('croppedImage', croppedImage);
      

    var infoid = toast.info('Aguarde...', {
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: false,
    });
    setLoading(true);

    
    handleCloseModal();
    fetch(croppedImage).then(res=>res.blob()).then(blob=>{
      const file = new File([blob], "file..jpg")
        uploadFile('public/upload', file, getUser().id).then(filelink=>{
          console.log('FileLink ', filelink)
          if(filelink === undefined) {
            throw 'Erro';
          }
          let user = getUser()
          user.profilePicture = filelink
        
        
          post('user/update', user).then(retUser=>{
              setUser(retUser)
              console.log('User ', getUser())
              window.location.reload(true)
              successMessage('Usuário atualizado com sucesso.')
              setLoading(false);

          }).catch(erro=>{
              console.log('Erro ', erro)
              errorMessage('Erro ao salvar foto de perfil, tente novamente.')
              setLoading(false);

          })
      
      }).catch(erro=>{
          console.log('Erro ', erro)
          setLoading(false);

      })
    }) 
    
    
  
  };

  return (
    <>
      {loading && 
          <div
          style={{
            position: "absolute",
            height: "100vh", 
            width: "100vw",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)"
          }}
        >
          Aguarde, carregando...
          <CircleLoader />
        </div>
      
      }
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <Cropper
              src={selectedImage}
              initialAspectRatio={1}
              guides={false}
              viewMode={2}
              aspectRatio={1 / 1}
              onInitialized={handleInitialized}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageCropper;