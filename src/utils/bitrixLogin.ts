import BitrixJS, {
  BitrixConfig,
  ModeConfig,
} from "@sknebo/bitrix-js";
let bitrix:any



const config = {
  client_id: 'app.64c370a00c6b53.62788568',
  client_secret: 'Zg11iJmXQ4pT9DMvINLOSgpGZ4EAMPwJZ9cng0H7VmzbjcuWAf',
};
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

const domain = urlParams.get('DOMAIN') || '';
bitrix = BitrixJS({
  mode: ModeConfig.OAuth,
  ...config,
  domain,
  https: true,
})

const tokens = {
  refresh_token: urlParams.get('REFRESH_ID') || '',
  expires_in: Number(urlParams.get('AUTH_EXPIRES')) || 0,
  access_token: urlParams.get('AUTH_ID') || '',
  member_id: urlParams.get('member_id') || '',
}

bitrix = BitrixJS({
  mode: ModeConfig.OAuth,
  ...config,
  https: true,
  refresh_token: tokens.refresh_token,
  expires_in: tokens.expires_in,
  access_token: tokens.access_token,
  domain: urlParams.get('DOMAIN') || '',
})




export default bitrix
