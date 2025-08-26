import Widgets from './widgets'
import Copyright from './copyright'
import { footer } from './data'
const { widgets, payment } = footer

const Footer: React.FC = () => (
  <footer className=' border-t border-[#f9f9f9] mt-9 md:mt-11 lg:mt-16 3xl:mt-20 lg:pt-0 2xl:pt-2'>
    <Widgets widgets={widgets}/>
    <Copyright payment={payment} />
  </footer>
)

export default Footer
