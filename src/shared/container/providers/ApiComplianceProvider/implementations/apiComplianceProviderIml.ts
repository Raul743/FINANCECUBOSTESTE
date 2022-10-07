/* eslint-disable prettier/prettier */
import axios from 'axios';

import { AppError } from '../../../../../errors/AppError';
import { IApiComplianceProvider } from '../IApiCompliceProvider';

class ApiComplianceProviderImpl implements IApiComplianceProvider {
  private client;
  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_COMPLIANCE_URL,
    });
  }

  login(): Promise<any | null> {
    return this.client
      .post('/auth/code', {
        email: process.env.API_COMPLIANCE_EMAIL,
        password: process.env.API_COMPLIANCE_PASSWORD,
      })
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw new AppError('Error: api Compliance failed in authorization')
      });
  }
  async getToken() {
    const { authCode } = await this.login();

   return this.client
      .post('/auth/token', {
        authCode,
      })
      .then((response) => {
        // console.log(response.data?.data?.accessToken);
        //  const auth = "Authorization"
        // this.client.defaults.headers.common[auth] = `Bearer ${response.data?.data?.accessToken}`;
        return response.data?.data?.accessToken
      })
      .catch((error) => {
        throw new AppError('Error: api Compliance authcode Error')
      });
  }
  async findDocumentByCnpj({
    document,
  }: {
    document: string;
  }): Promise<boolean> {
    const token= await this.getToken();
    return this.client.post('/cnpj/validate', {
      document,
    },{
      headers:{
        'Authorization': `Bearer ${token}`
      }}).then(response => {

        return response.data.success
         
        }).catch(err => {
          throw new AppError('Error: cnpj typed is Error')
        })
    
  }
  async findDocumentByCpf({ document }: { document: string }): Promise<boolean> {
   const token= await this.getToken();

    return this.client.post('/cpf/validate', {
      document
    },{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {

    return response.data.success
     
    }).catch(err => {
      throw new AppError('Error: Cpf typed is Error')
    })

  }
}

export { ApiComplianceProviderImpl };
