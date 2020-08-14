const SCOPE = 'oada.yield:all';
const METADATA_OPENATK = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRldjEiLCJqd2siOnsia3R5IjoiUlNBIiwibiI6InJyMzhpSzhGaTBfLUNSTFR2Vks0SUlDbGFyaWk2d1ZIcEU3elpQWG9FUmxfT29oNjRZbWJRY1JhNWVGdzBVUWhVdkVDaEt1OU5vM2ptN0xXOVpjTDFIS3Joa1VXLU9Rb2JPWFVuckNnb0NwYThWWWhfd1JJZFFZYnN2UFFWajVOR3V1TlhhWkJfX3B4Rnktbl9PMklNUzhPR3Jlem0zYlFIREFmLWpuZ0loWkdaZ0xhdkxKeVNIVXlEUUw0RmJRNkQzUXozQU1PcnhGdmE0S0JJUENRS0ZPbVlYVm40enRnVDY4aGd5TW9jMUt5dHhvUmd6VkhuQ2RUcFBXV1Zybk1GY0plZFlELUxtazBYbzVyallPeG1xOEExZWpmeFBNZVJfM1Y3OEFKazJMREk0dkdhSjNmbmFQWlM3Q3ZXOEYzcFdXaWpfQnlWR0NJLTVCcmtxSF9uUSIsImUiOiJBUUFCIn19.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9vcGVuYXRrLmNvbS9GaWVsZFdvcmtBcHAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vb3BlbmF0ay5jb20vRmllbGRXb3JrQXBwL29hdXRoMi9yZWRpcmVjdC8iLCJodHRwOi8vbG9jYWxob3N0L29hdXRoMi9yZWRpcmVjdC5odG1sIiwiaHR0cDovL2xvY2FsaG9zdC9vYXV0aDIvcmVkaXJlY3QvIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiYXV0aG9yaXphdGlvbl9jb2RlIl0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiY29kZSIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iLCJjb2RlIGlkX3Rva2VuIiwiY29kZSB0b2tlbiIsImNvZGUgaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJPcGVuQVRLIiwiY2xpZW50X3VyaSI6Imh0dHA6Ly9vcGVuYXRrLmNvbSIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwiandrcyI6eyJrZXlzIjpbeyJrdHkiOiJSU0EiLCJuIjoiLVlIWlpxZDVMWGtYUjdrZUpKaEhYbUdxelZVRmRVZUZLQ0IyaEwxU1BnU3VZV1VHamVoV1B2UEd0eTBLNGdOZGtyZmtSTkNxajU0LXp2aDFxekRfQ1dTQTV5LXZLcDNTZXNBQXF5RVZaM2NYRlhwVGRzZWxUYm1CSjB0dHJ3LW5oLXRlZVVBbmRKY0U5dWQ4aERYWm1EaGJzQmphVXhHbDZVdTUwWXE0cDVZSWNhR3hFbTJLMjFwekZ3dXQyMmFSSTNsa3lJekZWSjlqMjFtYkd2WXd6dUIyUGgzTmZfaHdZN2ZMMU1NdnpYY1Q2R0szaTJneTIyTGtBd0hTUmRSOXpsX29nVzhLZThLblptcHlLelJmaE04NVg5TV9oZ0JMSks1UVlNN1VvWDhkZnEzNmJYNzR0bHdDZWo1Q1BWR2FDcXQyZjdoeGRESjYxSndyNU5SOVBRIiwiZSI6IkFRQUIiLCJraWQiOiIwMjgzZjUxZDc4Mjc0NGJjYTExMTY4MzRkMGYyMjljMiJ9XX0sInNvZnR3YXJlX2lkIjoiYTcwM2JmZGMtM2ZhMS00OTlmLWI5MDUtMTFmMGI1NGYzODA3IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MzM4NDYxMTJ9.c1T-bOjMoiq676KViRw9d9ZaveDoKHOmFKCTswVEul-mPhRF84tcJDHvEcw8-SaVfC9Cymt9CQFGz24BGuy7-h8DX3wCSDg2VEAqoc-M8t7PuHnyYs6ZEoOApjt2Q8WWMjr-TlrS28CekKTWsMaC92q7DzKfk4rpbqFMmvJxunSvXR9iBVo-xpRBnJhHMZKCMshA4xkdL8GgnSyAbiFOe05ICpHSD7B2D8XVNsvcYPrOOshJAOUSwfS9089f8cB2iCoZYeNDj8H2rkBnzXXb_wgAKaUb8VYiGFL0o8g9A3sKgzbmJhtnF-PxrERk46g2nmn6MJUbDLvIs05kH4eN-Q';
const METADATA_LOCALHOST = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRldjEiLCJqd2siOnsia3R5IjoiUlNBIiwibiI6InJyMzhpSzhGaTBfLUNSTFR2Vks0SUlDbGFyaWk2d1ZIcEU3elpQWG9FUmxfT29oNjRZbWJRY1JhNWVGdzBVUWhVdkVDaEt1OU5vM2ptN0xXOVpjTDFIS3Joa1VXLU9Rb2JPWFVuckNnb0NwYThWWWhfd1JJZFFZYnN2UFFWajVOR3V1TlhhWkJfX3B4Rnktbl9PMklNUzhPR3Jlem0zYlFIREFmLWpuZ0loWkdaZ0xhdkxKeVNIVXlEUUw0RmJRNkQzUXozQU1PcnhGdmE0S0JJUENRS0ZPbVlYVm40enRnVDY4aGd5TW9jMUt5dHhvUmd6VkhuQ2RUcFBXV1Zybk1GY0plZFlELUxtazBYbzVyallPeG1xOEExZWpmeFBNZVJfM1Y3OEFKazJMREk0dkdhSjNmbmFQWlM3Q3ZXOEYzcFdXaWpfQnlWR0NJLTVCcmtxSF9uUSIsImUiOiJBUUFCIn19.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly92aXAzLmVjbi5wdXJkdWUuZWR1OjgwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjgwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjgwMDAvb2F1dGgyL3JlZGlyZWN0LyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6Ik9wZW5BVEsiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly92aXAzLmVjbi5wdXJkdWUuZWR1IiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjFmNzg0NzdmLTM1NDEtNDEzYi05N2I2LTg2NDRiNGFmNWJiOCIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTEyMDA2NzYxLCJqd2tzIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsIm4iOiJ1VjdaV21ESjJ4anJjbXJROHhXbW9XVUtLNUFjX0Uyd3ZRVm9JOTRaSUxQcXFLS2VDSTJXOEZabzVTT2xhVDd6YUV3RUVHVHpvcEFrTVpiNVRkZHF6emJRY2JKeW5tbFBzVmNvSEtaazRjSVZiaklVVWIyUXh2aW44WUtaNTlmQW1lSFhEU2Y2cktzMUdRSzNWeFYxMmdTSzZDdk92clBLel9IdkFrNzBHblJxV2IxUjVMV0VqdzNpYUdBSU9wcVU4X3hkd3NZaVJ1bmt1dGR6bDNOeUtLbm5tV0lEX2VhTHZSODFJRHBvM1phR0VNM2FSaUF0c3Y0My1jS3hTLWdydFJoSHRtblNpT2ZSbkh1a1JlSjU4azEyTjdIVnlzR2k3d1BLc3lKbHltdjZzWDR4Y2FUekFXd3NDRDZHWThhSzJaV0dmRkFnN3BybVBUaVZMaUhqb1EiLCJlIjoiQVFBQiIsImtpZCI6IjVhNWU3ZDQ1MzU3MjRjNjk5Yzk0MGExZjEyMTJkMzU2In1dfX0.W43ow1Mk8pAIJZ0-S4feCSdJbhhEFXAFycBxtUwVaHGNELXa5AiQQdayRcSpZLeYhBULeEE2Kg6Ikb6eqyWrO3w4QUAEs88YYpc2ghUJwFLrI_1_69hyeNLo_dt2qSc1fbc4Bx9zEUsFh1he9sUq4SAjrbTnv6v_o513XFbsSjDq_qzC2QTKuQRPxxxCsTRvDvP_gkTLXPzzh_I0ATJIgBCoRxT1UNBNU6xnuXSrwS9NG-8k_B2mABNAwvWdYpqQBH1g5D7vWcaT-urZ0Pc_7ZjQv_zN407Gn_hgCcZ1TkNtjlM7jM2dv09Ckk0vANCjuv31o0JtRKjZdblIkdB_jQ';

const REDIRECT_OPENATK = 'http://openatk.com/FieldWorkApp/oauth2/redirect/';
const REDIRECT_LOCALHOST = 'http://localhost:8000/oauth2/redirect/';

let METADATA;
let REDIRECT;
let oadaDomain = '';
if (process.env.NODE_ENV !== 'production') {
  console.log('NODE_ENV = ', process.env.NODE_ENV);
  METADATA = METADATA_LOCALHOST;
  REDIRECT = REDIRECT_LOCALHOST;
  oadaDomain = 'https://localhost';
} else {
  METADATA = METADATA_OPENATK;
  REDIRECT = REDIRECT_OPENATK;
}

let OPTIONS = {
    redirect: REDIRECT,
    metadata: METADATA,
    scope: SCOPE
};

export default {
  OPTIONS,
  REDIRECT,
  METADATA,
  SCOPE,
  oadaDomain
}