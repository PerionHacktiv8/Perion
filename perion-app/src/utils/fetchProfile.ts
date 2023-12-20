'use client'

import { ResponseAPIType } from '@/app/api/user/route'
import { UserModel } from '@/db/models/user'
import { useEffect, useState } from 'react'

const useProfile = () => {
  const [profData, setProfData] = useState<UserModel>()
  const [refresh, setRefresh] = useState<Boolean>()

  const profile = async () => {
    const res = await fetch('http://localhost:3000/api/user')
    const resJson = (await res.json()) as ResponseAPIType<UserModel>

    if (res && resJson && resJson.data) {
      setProfData(resJson.data)
    }
  }

  useEffect(() => {
    profile()
  }, [refresh])

  return { profData, setRefresh, refresh }
}

export default useProfile
