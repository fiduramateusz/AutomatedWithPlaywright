import { test, expect } from '@playwright/test'

test.describe.parallel('Api testing in Playwright', () => {
  const baseUrl = 'https://reqres.in/api'
  test('First test GET', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/3`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
  })
  test('Simple Api test - Asssert Invalid Endpoint 404', async ({
    request,
  }) => {
    const response = await request.get(`${baseUrl}/users/22374823`)
    expect(response.status()).toBe(404)
  })
  test('Get Request', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
    expect(responseBody.data.email).toBeTruthy()

    console.log(responseBody)
  })
  test('POST Request - Create a new user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/user`, {
      data: {
        id: 1000,
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.id).toBe(1000)
    expect(responseBody.createdAt).toBeTruthy()
  })
  test('Login - Successful', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.status()).toBe(200)
    expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4')
  })
  test('Login - Failed', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'peter@klaven',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })
  test('PUT - update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'new name',
        job: 'new job'
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('new name')
    expect(responseBody.job).toBe('new job')
    expect(responseBody.updatedAt).toBeTruthy()
  })
  test.only('Delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    // const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(204)
   
  })
})
