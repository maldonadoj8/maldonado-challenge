/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// Módulos de React.
import React, { 
  useMemo,
  useState } from 'react';

/*-------------------------------- Utilidades --------------------------------*/
// Utilidades de imagenes.
import { urlImagen } from '@utils/ut-imagen.js';

// Utilidades de texto.
import { formatearNumeroTelefonoT, formatearCodigoPaisT} 
from '@utils/ut-texto.js';

// Utilidades de ubicación.
import { CODIGOS_PAISES } from '@utils/ut-ubicacion.js';

/*---------------------------------- Hooks -----------------------------------*/
// Hook para formatear inputs.
import { HkCapturaDatos } from '@core/hooks/hk-captura-datos.js';

/*----------------------------------- MUI ------------------------------------*/
// Componentes MUI.
import { Chip, MenuItem, Stack } from '@mui/material';

// Iconos MUI.
import { CheckCircleOutlineOutlined, ErrorOutlineOutlined } 
from '@mui/icons-material';

/*------------------------------- Componentes --------------------------------*/
// Componente CpTextFieldLoader
import CpTextFieldLoader from '@common/components/cp-textfield-loader.js';

// Componente CpCardBase.
import CpCardBase from '@common/components/cp-card-base.js';

// Componente CpCardList.
import CpCardList from '@common/components/cp-card-list.js';

// Componente CpCardRow.
import CpCardRow from '@common/components/cp-card-row.js';

// Componente CpCardCampo.
import CpCardCampo from '@common/components/cp-card-campo.js';

// Componente CpCardCampoEditable.
import CpCardCampoEditable from '@common/components/cp-card-campo-editable.js';

// Componente CpSelectLoader
import CpSelectLoader from '@common/components/cp-select-loader.js';

// Componente CpImageLoader
import CpImageLoader from '@common/components/cp-image-loader.js';

/*--------------------------------- Archivos ---------------------------------*/
// Import placeholder image
import logoPlaceholder from '@assets/images/placeholder-1-1.jpg';

/*==============================================================================
---------------------------------- Constantes ----------------------------------
==============================================================================*/
// API base.
const API_EDICION = {
  'func'                : window.Negocio.editar,
  'ticket'              : (params) => `Negocio.editar.${params.campo}`,
  'parametros_estaticos': {}
};

/*==============================================================================
---------------------------------- Componente ----------------------------------
==============================================================================*/
/** 
 * Componente para editar el detalle de un negocio.
 * 
 * @param {Object} logo - Registro de adjunto del logo asociado al negocio.
 * @param {Object} negocio - Registro del negocio.
 * 
 * @returns {React.ReactNode}
 */
function CpCardEditarNegocio({logo, negocio}) {
  
  /*-------------------------------- useState --------------------------------*/
  // Campos editables del negocio.
  const [datos, setDatos] = useState({
    'nombre'              : negocio.nombre || '',
    'slogan'              : negocio.slogan || '',
    'descripcion'         : negocio.descripcion || '',
    'direccion'           : negocio.direccion || '',
    'telefono_nacional'   : negocio.telefono_nacional ? formatearNumeroTelefonoT(negocio.telefono_nacional) : '',
    'telefono_codigo_pais': negocio.telefono_codigo_pais,
    'coordenadas'         : `${negocio.latitud || 'N/A'}, ${negocio.longitud || 'N/A'}`,
    'facebook'            : negocio.facebook || '',
    'instagram'           : negocio.instagram || '',
    'twitter'             : negocio.twitter || '',
    'tiktok'              : negocio.tiktok || ''
  });

  /*----------------------------- HkCapturaDatos -----------------------------*/
  // Hook para formatear inputs y generar handlers.
  const {
    generarHandlers,
    estadoAPI
  } = HkCapturaDatos({
    'api_edicion'       : API_EDICION,
    'campos_edicion'    : ['nombre', 'slogan', 'descripcion', 'direccion',
                          'telefono_nacional', 'telefono_codigo_pais',
                          'coordenadas', 'facebook', 'instagram',
                          'twitter', 'tiktok'],
    'valores_iniciales' : datos,
    'registro_editar'   : negocio,
    'estado_condicional': negocio,
    'setEstadoExterno'  : setDatos,
  });

  /*-------------------------------- Handlers --------------------------------*/
  /**
   * Handlers para eventos del textfield nombre.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldNombre = useMemo(() => generarHandlers('nombre'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield slogan.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldSlogan = useMemo(() => generarHandlers('descripcion_basica'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield descripcion.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldDescripcion = useMemo(() => generarHandlers('descripcion'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield direccion.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldDireccion = useMemo(() => generarHandlers('descripcion'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield codigo pais.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldCodigoPais = useMemo(() => generarHandlers('codigo_pais'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield telefono nacional.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
    const handlersTextfieldTelefonoNacional = useMemo(() => generarHandlers('telefono'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield coordenadas.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldCoordenadas = useMemo(() => generarHandlers('ubicacion'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield facebook.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldFacebook = useMemo(() => generarHandlers('facebook'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield instagram.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldInstagram = useMemo(() => generarHandlers('instagram'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield twitter.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldTwitter = useMemo(() => generarHandlers('twitter'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield tiktok.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersTextfieldTikTok = useMemo(() => generarHandlers('tiktok'), [generarHandlers]);

  /**
   * Handlers para eventos del textfield logo.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler para evento onChange.
   * @property {Function} onKeyDown - Handler para evento onKeyDown.
   * @property {Function} onBlur - Handler para evento onBlur.
   */
  const handlersInputLogo = useMemo(() => generarHandlers('logo'), [generarHandlers]);

  /*================================== JSX ===================================*/
  return (

    /*--------------------------------- Card ---------------------------------*/
    <CpCardBase 
    title={

      /*-------------------------------- Logo --------------------------------*/
      <CpImageLoader
      src={logo && urlImagen(logo.public_id, null) || logoPlaceholder} 
      onChange={handlersInputLogo.onImageChange} 
      estadoAPI={estadoAPI} 
      tickets={['Negocio.editar.imagen.logo']} 
      tooltipTitle="Haz clic para cambiar el logo. Se requiere una imagen cuadrada de 1200x1200px."
      sx={{
        height     : '64px',
        width      : '64px',
        objectFit  : 'cover',
        border     : '1px dashed',
        borderColor: 'grey.500' }} />
    }
    action={
        
      /*---------------------------- Autorizacion ----------------------------*/
      <Chip 
      label={negocio.autorizado ? 'Autorizado' : 'No autorizado'} 
      icon={ 
        negocio.autorizado 
          ? <CheckCircleOutlineOutlined /> 
          : <ErrorOutlineOutlined /> 
      } />
    }>

      {/*------------------------------ Lista -------------------------------*/}
      <CpCardList> 

        {/*----------------------------- Row 1 ------------------------------*/}
        <CpCardRow>

          {/*---------------------------- Nombre ----------------------------*/}
          <CpCardCampoEditable 
          label="Nombre">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onChange={handlersTextfieldNombre.onChange} 
            onKeyDown={handlersTextfieldNombre.onKeyDown} 
            value={datos.nombre} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.nombre']} 
            name="nombre" 
            placeholder="Nombre del negocio" 
            size="small" />
          </CpCardCampoEditable>

          {/*------------------------ Identificador -------------------------*/}
          <CpCardCampo 
          label="Identificador" 
          value={negocio.id} />
        </CpCardRow>

        {/*----------------------------- Row 2 ------------------------------*/}
        <CpCardRow>

          {/*---------------------------- Slogan ----------------------------*/}
          <CpCardCampoEditable 
          label="Slogan">
            
            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onChange={handlersTextfieldSlogan.onChange} 
            onKeyDown={handlersTextfieldSlogan.onKeyDown} 
            value={datos.slogan} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.slogan']} 
            name="slogan" 
            placeholder="Slogan del negocio" 
            size="small" />
          </CpCardCampoEditable>
        </CpCardRow>

        {/*----------------------------- Row 3 ------------------------------*/}
        <CpCardRow>

          {/*------------------------- Descripcion --------------------------*/}
          <CpCardCampoEditable 
          label="Descripción">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onChange={handlersTextfieldDescripcion.onChange} 
            onKeyDown={handlersTextfieldDescripcion.onKeyDown} 
            value={datos.descripcion} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.descripcion']} 
            maxRows={10} 
            name="descripcion" 
            placeholder="Descripción del negocio" 
            size="small" 
            multiline/>
          </CpCardCampoEditable>
        </CpCardRow>

        {/*----------------------------- Row 4 ------------------------------*/}
        <CpCardRow 
        direction={{ xs: 'column', sm: 'row' }}>

          {/*--------------------------- Telefono ---------------------------*/}
          <CpCardCampoEditable 
          label="Teléfono">
            <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center">

              {/*---------------------- CpSelectLoader ----------------------*/}
              <CpSelectLoader 
              onChange={handlersTextfieldCodigoPais.onChange} 
              value={formatearCodigoPaisT(datos.telefono_codigo_pais)} 
              estadoAPI={estadoAPI} 
              tickets={['Negocio.editar.telefono_codigo_pais']} 
              renderValue={(value) => `${formatearCodigoPaisT(value)}`}
              name="telefono_codigo_pais">
                {
                  CODIGOS_PAISES.map((item) => (
                    <MenuItem 
                    key={item.codigo} 
                    value={item.codigo}>
                      +{item.codigo} ({item.pais})
                    </MenuItem>))
                }
              </CpSelectLoader>
          

              {/*-------------------- CpTextFieldLoader ---------------------*/}
              <CpTextFieldLoader 
              onChange={handlersTextfieldTelefonoNacional.onChange} 
              onKeyDown={handlersTextfieldTelefonoNacional.onKeyDown} 
              value={datos.telefono_nacional} 
              estadoAPI={estadoAPI} 
              tickets={['Negocio.editar.telefono_nacional']} 
              name="telefono_nacional" 
              placeholder="Número telefónico" 
              size="small" 
              sx={{
                flex: 1 }}/>
            </Stack>
          </CpCardCampoEditable>

          {/*-------------------------- Ubicacion ---------------------------*/}
          <CpCardCampoEditable 
          label="Ubicación (Pega el enlace o coordenadas)">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onKeyDown={handlersTextfieldCoordenadas.onKeyDown} 
            onPaste={handlersTextfieldCoordenadas.onPaste} 
            value={datos.coordenadas} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.latitud', 'Negocio.editar.longitud']} 
            name="coordenadas" 
            placeholder="Pega aquí el enlace o coordenadas" 
            size="small" />
          </CpCardCampoEditable>
        </CpCardRow>

        {/*----------------------------- Row 5 ------------------------------*/}
        <CpCardRow>

          {/*-------------------------- Direccion ---------------------------*/}
          <CpCardCampoEditable 
          label="Dirección">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onChange={handlersTextfieldDireccion.onChange} 
            onKeyDown={handlersTextfieldDireccion.onKeyDown} 
            value={datos.direccion} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.direccion']} 
            name="direccion" 
            placeholder="Dirección del negocio" 
            size="small" />
          </CpCardCampoEditable>
        </CpCardRow>

        {/*----------------------------- Row 6 ------------------------------*/}
        <CpCardRow 
        direction={{ xs: 'column', sm: 'row' }}>

          {/*--------------------------- Facebook ---------------------------*/}
          <CpCardCampoEditable 
          label="Facebook">


            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onKeyDown={handlersTextfieldFacebook.onKeyDown} 
            onPaste={handlersTextfieldFacebook.onPaste} 
            value={datos.facebook} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.facebook']} 
            name="facebook" 
            placeholder="Pegar URL" 
            size="small" 
            sx={{ flex: 1 }}/>
          </CpCardCampoEditable>

          {/*-------------------------- Instagram ---------------------------*/}
          <CpCardCampoEditable 
          label="Instagram">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onKeyDown={handlersTextfieldInstagram.onKeyDown} 
            onPaste={handlersTextfieldInstagram.onPaste} 
            value={datos.instagram} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.instagram']} 
            name="instagram" 
            placeholder="Pegar URL" 
            size="small" 
            sx={{ flex: 1 }} />
          </CpCardCampoEditable>
        </CpCardRow>

        {/*----------------------------- Row 7 ------------------------------*/}
        <CpCardRow 
        direction={{ xs: 'column', sm: 'row' }} 
        divider={false}>

          {/*--------------------------- TikTok ---------------------------*/}
          <CpCardCampoEditable 
          label="TikTok">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onKeyDown={handlersTextfieldTikTok.onKeyDown} 
            onPaste={handlersTextfieldTikTok.onPaste} 
            value={datos.tiktok} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.tiktok']} 
            name="tiktok" 
            placeholder="Pegar URL" 
            size="small" 
            sx={{ flex: 1 }}/>
          </CpCardCampoEditable>

          {/*-------------------------- Twitter/X ---------------------------*/}
          <CpCardCampoEditable 
          label="Twitter/X">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onKeyDown={handlersTextfieldTwitter.onKeyDown} 
            onPaste={handlersTextfieldTwitter.onPaste} 
            value={datos.twitter} 
            estadoAPI={estadoAPI} 
            tickets={['Negocio.editar.twitter']} 
            name="twitter" 
            placeholder="Pegar URL" 
            size="small" 
            sx={{ flex: 1 }} />
          </CpCardCampoEditable>
        </CpCardRow>
      </CpCardList>
    </CpCardBase>
  );
};

export default CpCardEditarNegocio;
