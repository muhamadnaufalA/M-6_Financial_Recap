const {
    createIncome,
    getIncomeByUserId,
    getIncomeById,
    updateIncome,
    deleteIncome,
  } = require('./IncomeController'); // Sesuaikan dengan jalur ke controller Anda
  
  const mockRequest = (body, params) => ({ body, params });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  describe('Income Controller', () => {
    test('createIncome should create income', async () => {
      const req = mockRequest({ name: 'Sample Income', balance: 100 }, { id: 1 });
      const res = mockResponse();
  
      await createIncome(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Income created' }));
    });
  
    test('getIncomeByUserId should get income by user ID', async () => {
      const req = mockRequest({}, { id: 'sampleUserId' });
      const res = mockResponse();
  
      await getIncomeByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      // Add expectations for the response data based on your business logic.
    });
  
    test('getIncomeById should get income by ID', async () => {
      const req = mockRequest({}, { id: 'sampleIncomeId' });
      const res = mockResponse();
  
      await getIncomeById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      // Add expectations for the response data based on your business logic.
    });
  
    test('updateIncome should update income', async () => {
      const req = mockRequest({ name: 'Updated Income' }, { id: 'sampleIncomeId' });
      const res = mockResponse();
  
      await updateIncome(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Income updated' }));
    });
  
    test('deleteIncome should delete income', async () => {
      const req = mockRequest({}, { id: 'sampleIncomeId' });
      const res = mockResponse();
  
      await deleteIncome(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Income deleted' }));
    });
  });
  