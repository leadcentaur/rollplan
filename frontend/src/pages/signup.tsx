import Image from 'next/image'
import SignUpForm from '@/components/site/auth/SignUpForm'

export default function Signup() {
  return (
      <SignUpForm onLoginInsteadClicked={() => {}} onDismiss={() => {}}/>
  )
}
