export const isAnonymouseUser = async (client: any): Promise<Boolean> => {
  const { data } = await client.auth.getUser()
  return Boolean(data?.user?.is_anonymous)
}
