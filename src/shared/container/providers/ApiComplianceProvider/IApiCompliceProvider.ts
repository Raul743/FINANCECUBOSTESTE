interface IApiComplianceProvider {
  login(): Promise<any | null>;
  getToken(): Promise<any | null>;
  findDocumentByCnpj({ document }: { document: string }): Promise<boolean>;
  findDocumentByCpf({ document }: { document: string }): Promise<boolean>;
}

export { IApiComplianceProvider };
