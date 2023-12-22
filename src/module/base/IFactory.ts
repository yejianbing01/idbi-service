export interface IFactory<DO, PO> {
  create(dto: Partial<DO>): DO;
  rebuild(po: PO): DO;
  transformDO2PO(dO: DO): PO;
}
