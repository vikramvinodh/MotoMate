import React, { useState, useEffect } from 'react';

const API_URL = 'https://translation.googleapis.com/language/translate/v2';
const HARDCODED_API_KEY = 'AIzaSyAYrruisrt0G9K835Bu0NhzkdopirzxJKE';

const GoogleTranslate = () => {
  const [apiKey] = useState(HARDCODED_API_KEY);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const [error, setError] = useState('');

  const handleApiCall = async (endpoint, body = {}) => {
    if (!apiKey) {
      throw new Error('API key is not set');
    }

    const response = await fetch(`${API_URL}${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const translateText = async (text, target, source = '') => {
    const data = await handleApiCall('', { q: text, target, source });
    return data.data.translations[0].translatedText;
  };

  const detectLanguage = async (text) => {
    const data = await handleApiCall('/detect', { q: text });
    return data.data.detections[0][0].language;
  };

  const getSupportedLanguages = async (target = '') => {
    const response = await fetch(`${API_URL}/languages?key=${apiKey}&target=${target}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.languages;
  };

  const handleTranslate = async () => {
    try {
      setError('');
      const translated = await translateText(inputText, targetLanguage);
      setTranslatedText(translated);
    } catch (error) {
      setError(`Translation failed: ${error.message}`);
      console.error('Translation failed:', error);
    }
  };

  const handleDetectLanguage = async () => {
    try {
      setError('');
      const detected = await detectLanguage(inputText);
      setDetectedLanguage(detected);
    } catch (error) {
      setError(`Language detection failed: ${error.message}`);
      console.error('Language detection failed:', error);
    }
  };

  const loadSupportedLanguages = async () => {
    try {
      setError('');
      const languages = await getSupportedLanguages('en');
      setSupportedLanguages(languages);
    } catch (error) {
      setError(`Failed to load supported languages: ${error.message}`);
      console.error('Failed to load supported languages:', error);
    }
  };

  useEffect(() => {
    if (apiKey) {
      loadSupportedLanguages();
    }
  }, [apiKey]);

  return (
    <div className="google-translate-container">
      <h2>Google Translate</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
        rows={4}
        cols={50}
      />
      <div>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          {supportedLanguages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
        <button onClick={handleTranslate} disabled={!apiKey}>Translate</button>
        <button onClick={handleDetectLanguage} disabled={!apiKey}>Detect Language</button>
      </div>
      {translatedText && (
        <div>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
      {detectedLanguage && (
        <div>
          <h3>Detected Language:</h3>
          <p>{detectedLanguage}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GoogleTranslate;
