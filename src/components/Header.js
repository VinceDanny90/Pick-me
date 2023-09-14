import { Container, Stack, Box, Button } from "./styled";
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as CartIcon } from "../images/cart.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Container size='fullwidth' position='fixed' background='grey.800' zIndex={999}
      >
        <Stack direction='column' align='center'>
          <Container>
            <Stack 
            justify='space-between' 
            slign='center' 
            width='100%' 
            height={['64px','72px']}
            >
              <Link to='/'
              style={{
                textDecoration: 'none'
              }}>
                <Logo />
              </Link>
              <Link to='/checkout'>
                <Button variant='text'>
                  <CartIcon/>
                </Button>
              </Link> 
            </Stack>
          </Container>
        </Stack> 
      </Container>
      <Box height={['64px','72px']} width='100%'/>
    </>
  );
};

export default Header;
