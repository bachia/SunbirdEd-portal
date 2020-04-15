const BASE_URL = "https://api.shikshalokam.org"
export const slConfig = {
    BASE_URL: BASE_URL,
    API_URL: {
        GENERATE_AND_LINK_QR_CODE: '/kendra-service/api/v1/bodh/platform/generate',
        GET_PDF_LINKS: '/kendra-service/api/v1/qr-codes/pdf',
        SYNC_COURSE:'/kendra/api/v1/bodh/batch/enrol'
    }

}