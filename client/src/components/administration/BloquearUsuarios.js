import React, { useState } from "react";
 
import { useSelector, useDispatch } from 'react-redux';
import { bloquearUsuario } from "../../redux/actions/userBlockAction";

const BloquearUsuarios = ({ setOpenModalBloqueo,  user }) => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const [datosBloqueo, setDatosBloqueo] = useState({
    motivo: "",
    contetn:"",
    fechaBloqueo:"",
    fechaLimite: "", // Nueva fecha de límite para el bloqueo

  });


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDatosBloqueo({ ...datosBloqueo, [name]: value });
  };

  const handleBloqueo = (e) => {
    e.preventDefault();
    dispatch(bloquearUsuario({ auth, datosBloqueo, user })); // ✅ Solo enviamos `motivo` y `fechaLimite`
  };

  return (
  <div className="container-modal-bloqueo">
        <div className="modal-content-bloqueo">
          <div className="modal-header-bloqueo">
            <h5 className="modal-title-bloqueo">Confirmar bloqueo</h5>
            <button className="btn btn-danger btn_close"
            onClick={() => setOpenModalBloqueo(false)}>
                Close
            </button>
          </div>
          <form onSubmit={handleBloqueo}>
          <div className="modal-body-bloqueo">
            {/* Select para el motivo */}
            <div className="form-group">
              <label>Motivo del bloqueo</label>
              <select
                className="form-control"
                name="motivo"
                value={datosBloqueo.motivo}
                onChange={handleChangeInput}
                required
              >
                <option value="">Seleccionar el motivo</option>
                <option value="Comportamiento abusivo">Comportamiento abusivo</option>
                <option value="Spam">Spam</option>
                <option value="Violación de las condiciones de uso">Violación de las condiciones de uso</option>
                <option value="Lenguaje ofensivo">Lenguaje ofensivo</option>
                <option value="Fraude">Fraude</option>
                <option value="Usurpación de identidad">Usurpación de identidad</option>
                <option value="Contenido inapropiado">Contenido inapropiado</option>
                <option value="Violación de la privacidad">Violación de la privacidad</option>
                <option value="Interrupción del servicio">Interrupción del servicio</option>
                <option value="Actividad sospechosa">Actividad sospechosa</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Campo para detalles adicionales */}
            <div className="form-group">
              <label>Detalles adicionales</label>
              <textarea
                name="content"
                value={datosBloqueo.content}
                onChange={handleChangeInput}
                placeholder="Proporciona más detalles sobre el motivo del bloqueo"
                className="form-control"
              />
            </div>

            {/* Fecha de inicio del bloqueo */}
            <div className="form-group">
              <label>Fecha de inicio del bloqueo</label>
              <input
                type="datetime-local"
                className="form-control"
                name="fechaBloqueo"
                value={datosBloqueo.fechaBloqueo}
                onChange={handleChangeInput}
              />
            </div>

            
            <div className="form-group">
              <label>Fecha límite del bloqueo</label>
              <input
                type="datetime-local"
                className="form-control"
                name="fechaLimite"
                value={datosBloqueo.fechaLimite}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="modal-footer-bloqueo">
            <button type="submit" className="btn btn-danger">
              Bloquear
            </button>
          </div>
        </form>
        </div>
     </div>
  );
};

export default BloquearUsuarios;
