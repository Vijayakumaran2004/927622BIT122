import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Tabs, Tab, ButtonGroup } from '@mui/material';
import axios from 'axios';

interface NumberResponse {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  // Manual calculation states
  const [numbers, setNumbers] = useState<string>('');
  const [average, setAverage] = useState<number | null>(null);

  // API states
  const [numberType, setNumberType] = useState<string>('even');
  const [response, setResponse] = useState<NumberResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Tab state
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const calculateAverage = () => {
    const numberArray = numbers
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));

    if (numberArray.length === 0) {
      setAverage(null);
      return;
    }

    const sum = numberArray.reduce((acc, curr) => acc + curr, 0);
    setAverage(sum / numberArray.length);
  };

  const fetchNumbers = async (type: string) => {
    setLoading(true);
    setError(null);
    setNumberType(type);
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${type}`);
      setResponse(response.data);
    } catch (err) {
      setError('Failed to fetch numbers. Please try again.');
      console.error('Error fetching numbers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Number Calculator
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Manual Input" />
              <Tab label="API Numbers" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <TextField
              fullWidth
              label="Enter numbers (comma-separated)"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              margin="normal"
              variant="outlined"
            />

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={calculateAverage}
              >
                Calculate Average
              </Button>
            </Box>

            {average !== null && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6">
                  Average: {average.toFixed(2)}
                </Typography>
              </Box>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom align="center">
                Select Number Type
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant={numberType === 'even' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => fetchNumbers('even')}
                  disabled={loading}
                >
                  Even Numbers
                </Button>
                <Button
                  variant={numberType === 'prime' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => fetchNumbers('prime')}
                  disabled={loading}
                >
                  Prime Numbers
                </Button>
                <Button
                  variant={numberType === 'fibo' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => fetchNumbers('fibo')}
                  disabled={loading}
                >
                  Fibonacci Numbers
                </Button>
                <Button
                  variant={numberType === 'rand' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => fetchNumbers('rand')}
                  disabled={loading}
                >
                  Random Numbers
                </Button>
              </Box>
            </Box>

            {error && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}

            {response && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Previous Window State:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {response.windowPrevState.join(', ') || 'Empty'}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Current Window State:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {response.windowCurrState.join(', ')}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Numbers Received:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {response.numbers.join(', ')}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Average:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {response.avg.toFixed(2)}
                </Typography>
              </Box>
            )}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 