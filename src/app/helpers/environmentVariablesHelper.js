// 'use strict'
// const env = process.env
// const fs = require('fs')
// const packageObj = JSON.parse(fs.readFileSync('/Users/kiran/workspace/SunbirdEd-portal/src/app/package.json', 'utf8'));
// let envVariables = {
//   LEARNER_URL: env.sunbird_learner_player_url || 'https://dev.shikshalokam.org/api/',
//   CONTENT_URL: env.sunbird_content_player_url || 'https://dev.shikshalokam.org/api/',
//   CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'http://10.160.0.5:5000',
//   PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
//   PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'https://dev.shikshalokam.org/auth',
//   PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
//   APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
//   DEFAULT_CHANNEL: env.sunbird_default_channel || 'SHIKSHALOKAMDEV',
//   EKSTEP_ENV: env.ekstep_env || 'qa',
//   PORTAL_PORT: env.sunbird_port || 3000,
//   PORTAL_API_AUTH_TOKEN: env.sunbird_api_auth_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYTJiMTA5MWVlMDE0MDQ3OTdhYjRjZDI3ODJmYTFkZCJ9.olC-mJ9JVqeeIf-eyBVYciPIIsqDm46XHbKuO1GgNG0',
//   PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
//   PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'https://dev.shikshalokam.org/api/echo/',
//   PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
//   PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
//   PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret || 'SLDev@733',
//   ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
//   PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
//   PORTAL_TITLE_NAME: env.sunbird_instance || 'Sunbird',
//   PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
//   PORTAL_THEME: env.sunbird_theme || 'default',
//   PORTAL_DEFAULT_LANGUAGE: env.sunbird_portal_default_language || 'en',
//   PORTAL_PRIMARY_BUNDLE_LANGUAGE: env.sunbird_portal_primary_bundle_language || 'en',
//   CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
//   LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
//   DATASERVICE_URL: env.sunbird_dataservice_url || 'https://dev.shikshalokam.org/api/',
//   KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'true',
//   KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
//   CACHE_STORE: env.sunbird_cache_store || 'memory',
//   CACHE_TTL: env.sunbird_cache_ttl || 1800,
//   learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://10.160.0.5:9000',
//   content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://10.160.0.5:5000',
//   ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.sunbird.org',
//   EXPLORE_BUTTON_VISIBILITY: env.sunbird_explore_button_visibility || 'true',
//   ENABLE_SIGNUP: env.sunbird_enable_signup || 'true',
//   BUILD_NUMBER: env.build_number || packageObj.version+'.'+packageObj.buildNumber,
//   TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://10.160.0.5:9001/',
//   PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
//   SUNBIRD_EXTCONT_WHITELISTED_DOMAINS: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
//   TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
//   PORTAL_CASSANDRA_CONSISTENCY_LEVEL: env.sunbird_cassandra_consistency_level || 'one',
//   PORTAL_CASSANDRA_REPLICATION_STRATEGY: env.sunbird_cassandra_replication_strategy || '{"class":"SimpleStrategy","replication_factor":1}',
//   CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
//   GOOGLE_OAUTH_CONFIG: {
//     clientId: env.sunbird_google_oauth_clientId,
//     clientSecret: env.sunbird_google_oauth_clientSecret
//   },
//   KEYCLOAK_GOOGLE_CLIENT: {
//     clientId: env.sunbird_google_keycloak_client_id,
//     secret: env.sunbird_google_keycloak_secret
//   },
// }
// envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
//   ? env.sunbird_cassandra_urls.split(',') : ['localhost']
// module.exports = envVariables


/**
 * QA
 */

// 'use strict'
// const env = process.env
// const fs = require('fs')
// const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'))
// let envVariables = {
//   LEARNER_URL: env.sunbird_learner_player_url || 'https://qa.shikshalokam.org/api/',
//   CONTENT_URL: env.sunbird_content_player_url || 'https://qa.shikshalokam.org/api/',
//   CONFIG_URL: env.sunbird_config_service_url || 'https://qa.shikshalokam.org/api/config/',
//   CONFIG_REFRESH_INTERVAL: env.config_refresh_interval || 10,
//   CONFIG_SERVICE_ENABLED: env.config_service_enabled || false,
//   CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'https://qa.shikshalokam.org',
//   PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
//   PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'https://qa.shikshalokam.org/auth',
//   PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
//   APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
//   DEFAULT_CHANNEL: env.sunbird_default_channel || 'SHIKSHALOKAM',
//   EKSTEP_ENV: env.ekstep_env || 'qa',
//   PORTAL_PORT: env.sunbird_port || 3000,
//   PORTAL_API_AUTH_TOKEN: env.sunbird_api_auth_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzYjhlODUzOTc3ZDk0OThjOTRlZDRiNWE2NmE0MmMzNSJ9.K5eLcj3MYhJqppFbIx6FBqrOfuTwYRVVFDPcX7u-VRc',
//   PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
//   PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'https://qa.shikshalokam.org/api/echo/',
//   PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
//   PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
//   PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret || 'SL0k@m@733',
//   ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
//   PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
//   PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
//   CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
//   LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
//   DATASERVICE_URL: env.sunbird_dataservice_url || 'https://qa.shikshalokam.org/api/',
//   KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'true',
//   KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
//   CACHE_STORE: env.sunbird_cache_store || 'memory',
//   CACHE_TTL: env.sunbird_cache_ttl || 0,
//   ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.sunbird.org',
//   BUILD_NUMBER: env.sunbird_build_number || packageObj.version + '.' + packageObj.buildHash,
//   TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://telemetry-service:9001/',
//   PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
//   RESPONSE_CACHE_TTL: env.sunbird_response_cache_ttl || '0', // used in tenant helper to cache the tenant response info
//   TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
//   CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
//   PORTAL_CASSANDRA_CONSISTENCY_LEVEL: env.sunbird_cassandra_consistency_level || 'one',
//   PORTAL_CASSANDRA_REPLICATION_STRATEGY: env.sunbird_cassandra_replication_strategy || '{"class":"SimpleStrategy","replication_factor":1}',
//   PORTAL_EXT_PLUGIN_URL: process.env.sunbird_ext_plugin_url || 'http://player_player:3000/plugin/',
//   DEVICE_REGISTER_API: process.env.sunbird_device_register_api || 'https://api.open-sunbird.org/v3/device/register/',
//   sunbird_instance_name: env.sunbird_instance || 'Sunbird',
//   sunbird_theme: env.sunbird_theme || 'default',
//   sunbird_default_language: env.sunbird_portal_default_language || 'en',
//   sunbird_primary_bundle_language: env.sunbird_portal_primary_bundle_language || 'en',
//   learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://learner-service:9000',
//   content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://content-service:5000',
//   sunbird_explore_button_visibility: env.sunbird_explore_button_visibility || 'true',
//   sunbird_help_link_visibility: env.sunbird_help_link_visibility || 'false',
//   sunbird_extcont_whitelisted_domains: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
//   sunbird_portal_user_upload_ref_link: env.sunbird_portal_user_upload_ref_link || 'http://www.sunbird.org/features-documentation/register_user',
//   sunbird_portal_video_max_size: env.sunbird_portal_video_max_size || '50',
//   GOOGLE_OAUTH_CONFIG: {
//     clientId: env.sunbird_google_oauth_clientId,
//     clientSecret: env.sunbird_google_oauth_clientSecret
//   },
//   KEYCLOAK_GOOGLE_CLIENT: {
//     clientId: env.sunbird_google_keycloak_client_id,
//     secret: env.sunbird_google_keycloak_secret
//   },
//   sunbird_google_captcha_site_key: env.sunbird_google_captcha_site_key,
//   sunbird_azure_report_container_name: env.sunbird_azure_report_container_name || 'reports',
//   sunbird_azure_account_name: env.sunbird_azure_account_name || "test",
//   sunbird_azure_account_key: env.sunbird_azure_account_key || "test"
// }
// envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
//   ? env.sunbird_cassandra_urls.split(',') : ['localhost']
// module.exports = envVariables





/**
 * Production
 */

'use strict'
const env = process.env
const fs = require('fs')
const packageObj = JSON.parse(fs.readFileSync('../package.json', 'utf8'))
let envVariables = {
  LEARNER_URL: env.sunbird_learner_player_url || 'https://bodh.shikshalokam.org/api/',
  CONTENT_URL: env.sunbird_content_player_url || 'https://bodh.shikshalokam.org/api/',
  CONFIG_URL: env.sunbird_config_service_url || 'https://bodh.shikshalokam.org/api/config/',
  CONFIG_REFRESH_INTERVAL: env.config_refresh_interval || 10,
  CONFIG_SERVICE_ENABLED: env.config_service_enabled || false,
  CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'https://bodh.shikshalokam.org',
  PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
  PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'https://bodh.shikshalokam.org/auth',
  PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
  APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
  DEFAULT_CHANNEL: env.sunbird_default_channel || 'SHIKSHALOKAM',
  EKSTEP_ENV: env.ekstep_env || 'prod',
  PORTAL_PORT: env.sunbird_port || 3000,
  PORTAL_API_AUTH_TOKEN: env.sunbird_api_auth_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2ZTIwM2IxODE5NmQ0ZDY1YmNjN2FiM2Y5NTEwOWJjMSJ9.WqYd1_WI4k1W_bQmKzbCixKqqIchxhFCM-uZ1bK-Esg',
  PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
  PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'https://bodh.shikshalokam.org/api/echo/',
  PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
  PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
  PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret || 'SL0k@m@733',
  ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
  PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
  PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
  CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
  LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
  DATASERVICE_URL: env.sunbird_dataservice_url || 'https://bodh.shikshalokam.org/api/',
  KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'true',
  KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
  CACHE_STORE: env.sunbird_cache_store || 'memory',
  CACHE_TTL: env.sunbird_cache_ttl || 0,
  ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.sunbird.org',
  BUILD_NUMBER: env.sunbird_build_number || packageObj.version + '.' + packageObj.buildHash,
  TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://telemetry-service:9001/',
  PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
  RESPONSE_CACHE_TTL: env.sunbird_response_cache_ttl || '0', // used in tenant helper to cache the tenant response info
  TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
  CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
  PORTAL_CASSANDRA_CONSISTENCY_LEVEL: env.sunbird_cassandra_consistency_level || 'one',
  PORTAL_CASSANDRA_REPLICATION_STRATEGY: env.sunbird_cassandra_replication_strategy || '{"class":"SimpleStrategy","replication_factor":1}',
  PORTAL_EXT_PLUGIN_URL: process.env.sunbird_ext_plugin_url || 'http://player_player:3000/plugin/',
  DEVICE_REGISTER_API: process.env.sunbird_device_register_api || 'https://api.open-sunbird.org/v3/device/register/',
  sunbird_instance_name: env.sunbird_instance || 'Sunbird',
  sunbird_theme: env.sunbird_theme || 'default',
  sunbird_default_language: env.sunbird_portal_default_language || 'en',
  sunbird_primary_bundle_language: env.sunbird_portal_primary_bundle_language || 'en',
  learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://learner-service:9000',
  content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://content-service:5000',
  sunbird_explore_button_visibility: env.sunbird_explore_button_visibility || 'true',
  sunbird_help_link_visibility: env.sunbird_help_link_visibility || 'false',
  sunbird_extcont_whitelisted_domains: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
  sunbird_portal_user_upload_ref_link: env.sunbird_portal_user_upload_ref_link || 'http://www.sunbird.org/features-documentation/register_user',
  sunbird_portal_video_max_size: env.sunbird_portal_video_max_size || '50',
  GOOGLE_OAUTH_CONFIG: {
    clientId: env.sunbird_google_oauth_clientId,
    clientSecret: env.sunbird_google_oauth_clientSecret
  },
  KEYCLOAK_GOOGLE_CLIENT: {
    clientId: env.sunbird_google_keycloak_client_id,
    secret: env.sunbird_google_keycloak_secret
  },
  sunbird_google_captcha_site_key: env.sunbird_google_captcha_site_key,
  sunbird_azure_report_container_name: env.sunbird_azure_report_container_name || 'reports',
  sunbird_azure_account_name: env.sunbird_azure_account_name || "test",
  sunbird_azure_account_key: env.sunbird_azure_account_key || "test"
}
envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
  ? env.sunbird_cassandra_urls.split(',') : ['localhost']
module.exports = envVariables