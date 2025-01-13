import { useState } from 'react';
import './App.css';
import Input from './components/common/Input/Input';

function App() {
    // example code to test input field
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleEmailChange = (value: string): void => {
        setEmail(value);
    };

    const handlePwdChange = (value: string): void => {
        setPwd(value);
    };

    return (
        <div style={{ width: '20%' }}>
            <Input
                labelText="Email *"
                id="ex"
                type="email"
                value={email}
                onChange={handleEmailChange}
                // error="Invalid format"
            />

            <br />

            <Input
                labelText="Password *"
                id="ex"
                type="password"
                value={pwd}
                onChange={handlePwdChange}
                // error="Invalid format"
            />
        </div>
    );
}

export default App;
