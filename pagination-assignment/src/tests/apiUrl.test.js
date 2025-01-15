global.fetch = jest.fn((url) => {
    if (url === 'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ message: 'Success' }),
      });
    } else {
      return Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not Found' }),
      });
    }
  });
  
  test('should fetch data successfully for valid URL', async () => {
    const apiUrl = 'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';
  
    const response = await fetch(apiUrl);
  
    expect(global.fetch).toHaveBeenCalledWith(apiUrl);
  
    expect(response.status).toBe(200);
  
    const data = await response.json();
    expect(data.message).toBe('Success');
  });
  