// const BASE_URL = "https://api.shikshalokam.org"
const BASE_URL = "https://qahome.shikshalokam.org"

export const slConfig = {
    BASE_URL: BASE_URL,
    API_URL: {
        GENERATE_AND_LINK_QR_CODE: '/kendra-service/api/v1/bodh/platform/generate',
        GET_PDF_LINKS: '/kendra-service/api/v1/qr-codes/pdf',
        SYNC_COURSE:'/kendra-service/api/v1/bodh/batch/enrol',
        SCROM_CONTENT_CREATE:'/kendra-service/api/v1/bodh/platform/uploadScromContent?name='
    }

}