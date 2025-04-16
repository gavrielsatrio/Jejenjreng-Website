function useSpreadsheet() {
  const updateOrderStatus = async (spreadsheetID: string, rowNo: number, status: string) => {
    const request = await fetch(`/api/orders/${spreadsheetID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rowNo,
        status
      })
    });

    if(!request.ok) {
      return 'Failed';
    }

    const response = await request.json();
    return response;
  }

  return {
    updateOrderStatus
  }
}

export { useSpreadsheet }