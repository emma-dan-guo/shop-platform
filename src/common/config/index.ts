const Config = {
  API_URI: `${process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''}/api/v1`
}

export default Config
