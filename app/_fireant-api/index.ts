import { HistoryQuote } from './types';

const HEADERS = {
  "accept": "application/json, text/plain, */*",
  "accept-language": "en;q=0.5",
  "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTcwNTE3MDk1LCJuYmYiOjE2NzA1MTcwOTUsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiJlNzY3N2JlMy1mYTUwLTRhYjEtYTg2MS1lMTgzODRiYjIzNGIiLCJhdXRoX3RpbWUiOjE2NzA1MTcwOTUsImlkcCI6Ikdvb2dsZSIsIm5hbWUiOiJhbGFuZ2tpZW45NkBnbWFpbC5jb20iLCJzZWN1cml0eV9zdGFtcCI6ImE2ZDQ2OWQzLTNlYmItNGMyNy04NTk4LWZiNTEyMjI2NDhhMiIsImp0aSI6IjNmM2Y5MDgyN2MyODVmNzMxM2NlZjVhZGEwYmU2YjU4IiwiYW1yIjpbImV4dGVybmFsIl19.u_jJA3xSD2pNtSSvb-2mHfgQl87UvE2WqwT5Ex2YXjyj8VZ_Ujt7f0h4r8Qz2_DE5usJ_-xkaRYUFI2C4ACJVW-oXCCCqHP0GsK9_i9HP3BWs0EwKk4u3Bydtb-BamcZM_kjC-G4sP8l340S0pSoV19kQx8SM4mKNKcPFzkn7ARraeQoMNtq95gqD2jfZvqigrXtq4nSfDoE7C_1aQNATe27WJ1f3NfL3NLM4FnZbURsdo3AmEu2vTOdwODMGC2qgAgthS2azkFfQEVS-eurQ9QX3kPuN2M60hndEVm2HfrEoK3K8EY_0AOuQwpggttWaTw8mFjN1s_yBcdXB8ffLA",
};

const BASE_URL = "https://restv2.fireant.vn/symbols";

interface GetHistoryParam {
  ticker: string
  startDate: string
  endDate: string
}

export async function getHistoryQuotes(params: GetHistoryParam): Promise<HistoryQuote[]> {
 const res = await fetch(`${BASE_URL}/${params.ticker}/historical-quotes?startDate=${params.startDate}&endDate=${params.endDate}&offset=0&limit=20`, {
   headers: HEADERS,
   method: "GET",
  })

  if (!res.ok) {
    throw new Error('Get History Quotes failed.')
  }

  return res.json()
}
