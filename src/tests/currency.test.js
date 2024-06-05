
import { getCurrency } from '../api/api'; 
describe('getCurrency', () => {
    it('should fetch currency values correctly', async () => {
      const response = await getCurrency.getCurrencyValues();
  
      expect(response).toBeTruthy();
    });
});
