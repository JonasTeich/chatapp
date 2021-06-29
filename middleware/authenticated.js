export default ({$supabase, redirect}) => {
  if (!$supabase.auth.user()) {
    return redirect('/auth')
  }
}