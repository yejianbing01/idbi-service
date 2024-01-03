type MetaDataKey = 'require-login';

type Config_redis = {
  redis_server_host: string;
  redis_server_port: string;
  redis_server_db: string;
};

type Config_nodemailer = {
  nodemailer_host: string;
  nodemailer_port: string;
  nodemailer_auth_user: string;
  nodemailer_auth_pass: string;
};

type Config_mysql = {
  mysql_server_host: string;
  mysql_server_port: string;
  mysql_server_username: string;
  mysql_server_password: string;
  mysql_server_database_common: string;
};

type Config_nest = {
  nest_server_port: string;
};

type Config_jwt = {
  jwt_secret: string;
  jwt_access_token_expires_time: string;
  jwt_refresh_token_expres_time: string;
};
