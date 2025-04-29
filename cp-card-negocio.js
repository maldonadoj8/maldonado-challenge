/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// Módulos de React.
import React from 'react';

/*-------------------------------- Utilidades --------------------------------*/
// Utilidades de imagenes.
import { urlImagen } from '@utils/ut-imagen.js';

// Utilidades de texto.
import { formatearNumeroTelefonoT } from '@utils/ut-texto.js';

/*----------------------------------- MUI ------------------------------------*/
// Componentes MUI.
import { Chip } from '@mui/material';

// Iconos MUI.
import { CheckCircleOutlineOutlined, ErrorOutlineOutlined } 
from '@mui/icons-material';

/*------------------------------- Componentes --------------------------------*/
// Componente CpCardBase.
import CpCardBase from '@common/components/cp-card-base.js';

// Componente CpCardList.
import CpCardList from '@common/components/cp-card-list.js';

// Componente CpCardRow.
import CpCardRow from '@common/components/cp-card-row.js';

// Componente CpCardCampo.
import CpCardCampo from '@common/components/cp-card-campo.js';

// Componente CpImageLoader.
import CpImageLoader from '@common/components/cp-image-loader.js';

/*--------------------------------- Archivos ---------------------------------*/
// Imagen logoPlaceholder.
import logoPlaceholder from '@assets/images/placeholder-1-1.jpg';

/*==============================================================================
---------------------------------- Componente ----------------------------------
==============================================================================*/
/** 
 * Componente para visualizar el detalle de un negocio.
 * 
 * @param {Object} logo - Registro de adjunto del logo asociado al negocio.
 * @param {Object} negocio - Registro del negocio.
 * 
 * @returns {React.ReactNode}
 */
function CpCardNegocio({logo, negocio}) {

  /*================================== JSX ===================================*/
  return (

    /*--------------------------------- Card ---------------------------------*/
    <CpCardBase
    title={

      /*-------------------------------- Logo --------------------------------*/
      <CpImageLoader 
      src={logo && urlImagen(logo.public_id, null) || logoPlaceholder} 
      soloVisualizar={true} 
      tituloVisualizar={"Logo del negocio"} 
      sx={{
        aspectRatio: '1/1',
        width      : { xs: '50%', sm: '33%', md: '16.6%' },
        objectFit  : 'cover',
        borderRadius: 2
      }} />
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
          <CpCardCampo 
          label="Nombre" 
          value={negocio.nombre} />

          {/*------------------------ Identificador -------------------------*/}
          <CpCardCampo 
          label="Identificador" 
          value={negocio.id} />
        </CpCardRow>

        {/*----------------------------- Row 2 ------------------------------*/}
        <CpCardRow>
          
          {/*---------------------------- Slogan ----------------------------*/}
          <CpCardCampo 
          label="Slogan" 
          value={negocio.slogan || 'No registrado'} />
        </CpCardRow>

        {/*----------------------------- Row 3 ------------------------------*/}
        <CpCardRow>

          {/*------------------------- Descripcion --------------------------*/}
          <CpCardCampo 
          label="Descripción" 
          value={negocio.descripcion || 'No registrado'} 
          sx={{ 
            whiteSpace: 'pre-line' }} />
        </CpCardRow>

        {/*----------------------------- Row 4 ------------------------------*/}
        <CpCardRow 
        direction={{ xs: 'column', sm: 'row' }}>

          {/*--------------------------- Telefono ---------------------------*/}
          <CpCardCampo 
          label="Teléfono" 
          value={
            (negocio.telefono_nacional && negocio.telefono_codigo_pais)
              ? `${negocio.telefono_codigo_pais} ${formatearNumeroTelefonoT(negocio.telefono_nacional)}` 
              : 'No registrado'
          } />

          {/*-------------------------- Ubicacion ---------------------------*/}
          <CpCardCampo 
          label="Ubicación" 
          value={
            (negocio.latitud && negocio.longitud) 
              ? 'Ver en Maps' 
              : 'No registrada'
          } 
          linkG={(negocio.latitud && negocio.longitud) && {'href': `https://maps.google.com/?q=${negocio.latitud},${negocio.longitud}&zoom=15&maptype=satellite`}} />
        </CpCardRow>

        {/*----------------------------- Row 5 ------------------------------*/}
        <CpCardRow>

          {/*-------------------------- Direccion ---------------------------*/}
          <CpCardCampo 
          label="Dirección" 
          value={negocio.direccion || 'No registrada'} />
        </CpCardRow>

        {/*----------------------------- Row 6 ------------------------------*/}
        <CpCardRow 
        direction={{ xs: 'column', sm: 'row' }}>
          
          {/*--------------------------- Facebook ---------------------------*/}
          <CpCardCampo 
          label="Facebook" 
          value={negocio.facebook ? 'www.facebook.com' : 'No registrado'} 
          linkG={negocio.facebook && { 'href': negocio.facebook }} />

          {/*-------------------------- Instagram ---------------------------*/}
          <CpCardCampo 
          label="Instagram" 
          value={negocio.instagram ? 'www.instagram.com' : 'No registrado'} 
          linkG={negocio.instagram && { 'href': negocio.instagram }} />
        </CpCardRow>

        {/*----------------------------- Row 6 ------------------------------*/}
        <CpCardRow 
        direction={{ xs: 'column', sm: 'row' }} 
        divider={false}>
           
          {/*---------------------------- TikTok ----------------------------*/}
          <CpCardCampo 
          label="TikTok" 
          value={negocio.tiktok ? 'www.tiktok.com' : 'No registrado'} 
          linkG={negocio.tiktok && { 'href': negocio.tiktok }} />

          {/*-------------------------- Twitter/X ---------------------------*/}
          <CpCardCampo 
          label="Twitter/X" 
          value={negocio.twitter ? 'www.x.com' : 'No registrado'} 
          linkG={negocio.twitter && { 'href': negocio.twitter }} />
        </CpCardRow>
      </CpCardList>
    </CpCardBase>
  );
};

export default CpCardNegocio;