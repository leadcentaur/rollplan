import Image from 'next/image'
import SignUpForm from '@/components/site/auth/SignUpForm2'

export default function Signup() {
  return (
      <SignUpForm onLoginInsteadClicked={() => {}} onDismiss={() => {}}/>
  )
}
