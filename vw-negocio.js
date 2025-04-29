/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// Módulos de React.
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

/*---------------------------------- Hooks -----------------------------------*/
// Hook HkConsultaRegistro.
import { HkConsultaRegistro } from '@core/hooks/hk-consulta-registro.js';

/*----------------------------------- MUI ------------------------------------*/
// Componentes MUI.
import { Button, IconButton, Link, Menu, MenuItem, Stack } from '@mui/material';

// Iconos MUI.
import { MoreVert } from '@mui/icons-material';

/*------------------------------- Componentes --------------------------------*/
// Componente cpEncabezadoBreadcrumbs.
import CpEncabezadoBreadcrumbs 
from '@common/components/cp-encabezado-breadcrumbs.js';

// Componente CpLinearProgress.
import CpLinearProgress from '@common/components/cp-linear-progress.js';

// Componente CpCardNegocio.
import CpCardNegocio from '../components/cp-card-negocio.js';

// Componente CpCardHorario.
import CpCardHorario from '../components/cp-card-horario.js';

// Componente CpCardImagenes.
import CpCardImagenes from '../components/cp-card-imagenes.js';

// Componente CpCardInstrucciones.
import CpCardInstrucciones from '../components/cp-card-instrucciones.js';

// Componente CpCardEditarNegocio.
import CpCardEditarNegocio from '../components/cp-card-editar-negocio.js';

// Componente CpCardEditarHorario.
import CpCardEditarHorario from '../components/cp-card-editar-horario.js';

// Componente CpCardEditarImagenes.
import CpCardEditarImagenes from '../components/cp-card-editar-imagenes.js';

// Componente CpCardEditarInstrucciones.
import CpCardEditarInstrucciones 
from '../components/cp-card-editar-instrucciones.js';

/*==============================================================================
---------------------------------- Constantes ----------------------------------
==============================================================================*/
// URLs para acceder a la Weeii shop.
const URL_SHOP = window.Entorno.modo_testing_p() 
? 'https://shop-test.weeii.app'
: 'https://shop.weeii.app'

/*==============================================================================
---------------------------------- Componente ----------------------------------
==============================================================================*/
/** 
 * Vista VwNegocio. 
 */
function VwNegocio() {

  {/*-------------------------- HkConsultaRegistro --------------------------*/}
  const {
    registro,
    estadoAPI,
    llamadaApiBase,
  } = HkConsultaRegistro({
    'api_base': {
      'ticket': 'Negocio.q_id_usuario',
      'func'  : window.Negocio.q_id_usuario 
    },
    'profundidad'      : [window.MDD.ENTIDAD.ADJUNTO.ID],
    'entidad_respuesta': 'negocio' });

  /*-------------------------------- useState --------------------------------*/
  // Elemento ancla para menú de opciones.
  const [anchorMenuOpciones, setAnchorMenuOpciones] = useState(null);

  // Se esta editando el negocio?.
  const [editando, setEditando] = useState(false);

  /*-------------------------------- useMemo ---------------------------------*/
  // Logo asociado al negocio.
  const LOGO = useMemo(() => {
    if(!registro) { return undefined; }
    return window.BDD.BDD.ADJUNTO[registro.logo];
  }, [registro]);

  // Banner asociado al negocio.
  const BANNER = useMemo(() => {
    if(!registro) { return undefined; }
    return window.BDD.BDD.ADJUNTO[registro.banner];
  }, [registro]);

  // Fachada asociada al negocio.
  const FACHADA = useMemo(() => {
    if(!registro) { return undefined; }
    return window.BDD.BDD.ADJUNTO[registro.id_adjunto_fachada];
  }, [registro]);

  // Imagenes asociadas al negocio.
  const IMAGENES = useMemo(() => {
    if(!registro) { 
      return {
        'img1': undefined,
        'img2': undefined,
        'img3': undefined,
        'img4': undefined }}
    return {
      'img1': window.BDD.BDD.ADJUNTO[registro.id_img_1],
      'img2': window.BDD.BDD.ADJUNTO[registro.id_img_2],
      'img3': window.BDD.BDD.ADJUNTO[registro.id_img_3],
      'img4': window.BDD.BDD.ADJUNTO[registro.id_img_4] 
    }
  }, [registro]);

  /*------------------------------- useEffect --------------------------------*/
  /**
   * Handler para el evento onClick del MenuItem editar negocio.
   * 
   * @returns {void}
   */
  const handlerOnClickMenuItemEditarNegocio = useCallback((_e) => {
    setEditando(true);
    setAnchorMenuOpciones(null);
  }, []);

  /*------------------------------- useEffect --------------------------------*/
  /**
   * Al montar el componente.
   */
  useEffect(() => {
    llamadaApiBase({ 
      'campo': 'id_usuario',
      'id'   : window.UsuarioActual.id });
  }, []);

  /*================================== JSX ===================================*/
  return (
    <>

      {/*-------------------------- LinearProgress --------------------------*/}
      <CpLinearProgress 
      estadoAPI={estadoAPI} 
      tickets={['Negocio.q_id_usuario']} />

      {/*--------------------------- Informacion ----------------------------*/}
      {
        registro && 
          <Stack 
          sx={{
            gap: 2 }}>

            {/*------------------------- Encabezado -------------------------*/}
            <Stack 
            sx={{
              alignItems    : 'center',
              flexDirection : 'row',
              justifyContent: 'space-between' }}>

              {/*----------------------- Breadcrumbs ------------------------*/}
              <CpEncabezadoBreadcrumbs 
              title={`${registro.nombre}`} 
              breadcrumbs={['Comercio', 'Negocios', 'Mi negocio']} />

              {/*--------------------------- Menu ---------------------------*/}
              {
                editando 
                  ? (
                      <Button 
                      onClick={() => setEditando(false)} 
                      variant="contained">
                        Finalizar
                      </Button>
                    )
                  : <>
                      <IconButton 
                      onClick={(e) => setAnchorMenuOpciones(e.currentTarget)} 
                      color="inherit" 
                      size="large" 
                      sx={{
                        marginLeft: "8px"
                      }}>
                        <MoreVert/>
                      </IconButton>
                      
                      <Menu
                      onClose={() => setAnchorMenuOpciones(null)} 
                      anchorEl={anchorMenuOpciones} 
                      open={Boolean(anchorMenuOpciones)} 
                      anchorOrigin={{
                        horizontal: 'right',
                        vertical  : 'bottom' }}
                      transformOrigin={{
                        vertical  : 'top',
                        horizontal: 'right' }}>

                        {/*--------------------- Editar ---------------------*/}
                        <MenuItem 
                        onClick={handlerOnClickMenuItemEditarNegocio}> 
                          Editar
                        </MenuItem>

                        {/*---------------- Ver como cliente ----------------*/}
                        <MenuItem 
                        target='blank'> 
                          <Link 
                          href={`${URL_SHOP}/aliados/catalogo?id=${registro.id}`} 
                          target="_blank" 
                          sx={{
                            color         : 'inherit',
                            textDecoration: 'none',
                          }}>
                            Ver como cliente
                          </Link>
                        </MenuItem>
                      </Menu>
                    </>
              }
            </Stack>

            {/*-------------------------- Negocio ---------------------------*/}
            {
              editando 
                ? 
                  /*------------------------ Edicion -------------------------*/
                  <>

                    {/*------------------ Edición de Negocio ----------------*/}
                    <CpCardEditarNegocio 
                    logo={LOGO} 
                    negocio={registro} />

                    {/*---------------- Edición de Horario -----------------*/}
                    <CpCardEditarHorario 
                    negocio={registro} />

                    {/*--------------- Edición de Imágenes -----------------*/}
                    <CpCardEditarImagenes 
                    banner={BANNER} 
                    imagenes={IMAGENES} 
                    fachada={FACHADA} 
                    negocio={registro} />
                    
                    {/*------------ Edición de Instrucciones ----------------*/}
                    <CpCardEditarInstrucciones
                    negocio={registro} />
                  </>
                : 
                  /*--------------------- Visualizacion ----------------------*/
                  <>

                    {/*---------------------- Negocio -----------------------*/}
                    <CpCardNegocio 
                    logo={LOGO} 
                    negocio={registro} />

                    {/*---------------------- Horario -----------------------*/}
                    <CpCardHorario
                    negocio={registro} />

                    {/*---------------------- Imagenes ----------------------*/}
                    {
                      IMAGENES &&
                        <CpCardImagenes 
                        banner={BANNER} 
                        fachada={FACHADA} 
                        imagenes={IMAGENES} />
                    }
                    {/*------------------- Instrucciones --------------------*/}
                    <CpCardInstrucciones 
                    negocio={registro} />
                  </>
            }
          </Stack>
      }
    </>
  );
};

export default VwNegocio;

/*==============================================================================
------------------------------------ Objeto ------------------------------------
==============================================================================*/
// [
//   {
//       "descripcion"                        : "En nuestro acogedor restaurante, te invitamos a disfrutar de una experiencia única para los amantes de la comida asiática!",
//       "id"                                 : 14,
//       "promo_fin_vigencia"                 : null,
//       "horario_inicio"                     : 0,
//       "id_img_2"                           : 1346,
//       "nombre"                             : "Bao Social club",
//       "id_eliminador"                      : null,
//       "orden_porcentaje"                   : 10,
//       "horario_fin_sabado"                 : null,
//       "id_entidad_creador"                 : 90,
//       "id_img_1"                           : 1345,
//       "direccion"                          : "P.º del Río 6, Río Tijuana 3a. Etapa, Rio Tijuana 3ra Etapa, 22226 Tijuana, B.C.",
//       "instrucciones_repartidores_entregar": "",
//       "sitio_web"                          : "https://www.web.com",
//       "horario_fin_jueves"                 : null,
//       "horario_fin_martes"                 : null,
//       "promo_efectivo_cuota_porcentaje"    : 4,
//       "horario_inicio_martes"              : null,
//       "promo_orden_porcentaje"             : 10,
//       "razon_social"                       : null,
//       "id_creador"                         : 2,
//       "promo_inicio_vigencia"              : null,
//       "latitud"                            : 32.48454668352352,
//       "version"                            : 40,
//       "timestamp_creacion"                 : 1721200652,
//       "horario_fin_viernes"                : null,
//       "horario_fin_domingo"                : null,
//       "id_entidad"                         : 200,
//       "horario_inicio_jueves"              : null,
//       "id_img_4"                           : 1348,
//       "timestamp_modificacion"             : 1743191912,
//       "horario_inicio_sabado"              : null,
//       "horario_inicio_lunes"               : null,
//       "autorizado"                         : true,
//       "efectivo_cuota_min"                 : 20,
//       "id_img_6"                           : null,
//       "instrucciones_repartidores_recojer" : "",
//       "instrucciones_repartidores"         : "",
//       "longitud"                           : -116.92727375853012,
//       "banner"                             : 1214,
//       "horario_fin"                        : 1700,
//       "horario_inicio_viernes"             : null,
//       "id_entidad_eliminador"              : null,
//       "activo"                             : true,
//       "telefono_codigo_pais"               : "52",
//       "horario_fin_lunes"                  : null,
//       "id_usuario"                         : 152,
//       "id_img_5"                           : null,
//       "tiktok"                             : null,
//       "promo_autorizada"                   : true,
//       "instagram"                          : "https://instagram.com",
//       "facebook"                           : "https://facebook.com",
//       "promo_duracion"                     : null,
//       "timestamp_eliminacion"              : null,
//       "abierto"                            : true,
//       "orden_fijo"                         : 10,
//       "email"                              : null,
//       "horario_inicio_miercoles"           : null,
//       "id_adjunto_fachada"                 : null,
//       "logo"                               : 1216,
//       "eliminacion_activa"                 : null,
//       "creacion_activa"                    : true,
//       "id_img_3"                           : 1347,
//       "promo_orden_fijo"                   : 10,
//       "telefono"                           : "526641699297",
//       "twitter"                            : "https://x.com",
//       "promo_efectivo_cuota_min"           : 20,
//       "slogan"                             : "Comida asiática callejera",
//       "foto"                               : null,
//       "horario_fin_miercoles"              : null,
//       "efectivo_cuota_porcentaje"          : 4,
//       "horario_inicio_domingo"             : null,
//       "promo_precio"                       : null,
//       "telefono_nacional"                  : "6641699297"
//   }
// ]