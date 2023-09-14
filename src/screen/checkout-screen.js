import Layout from "../components/layout";
import {
  Container,
  Box,
  Stack,
  Button,
  InputWrapper,
} from "../components/styled";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Formik } from "formik";
import * as Yup from "yup";
import { clearCart, removeFromCart } from "../redux/reducers/cart-reducer";

const validationSchema = Yup.object({
  name: Yup.string()
  .max(75, "Non si possono avere più di 75 caratteri")
  .min(2, "Minimo 2 caratteri")
  .required("Da inserire un nome"),
  cognome: Yup.string()
  .max(250, "Non si possono avere più di 250 caratteri")
  .min(2, "Minimo 2 caratteri")
  .required("Da inserire un Cognome"),
  card: Yup.string()
  .max(25, "La carta ha massimo 25 caratteri")
  .min(25, "La carta ha minimo 25 caratteri")
  .required(),
  address: Yup.string()
  .max(75, "Non si possono avere più di 75 caratteri")
  .min(2, "Minimo 2 caratteri")
  .required("Inserisci un indirizzo valido"),
  civico: Yup.number()
  .max(10000,"Numero massimo è 10000")
  .positive("Non puoi mettere un numero negativo")
  .moreThan(0, "Non vale un civico 0")
  .required(),
  cap: Yup.string()
  .max(10, "Massimo 10 caratteri per il cap")
  .min(3, "Il minimo per un cap è 5 numeri")
  .required("Devi inserire un cap valido"),
});

const initialValue = {
  name: '',
  cognome: '',
  card: '',
  address: '',
  civico: '',
  cap: '',
}

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const {cart, total} = useSelector((store) => store.cart);

  return (
    <Layout>
      <Container size='fullwidth' mb='118px'>
        <Container mt='96px'>
          <Box>
            <h1>Carrello</h1>
          </Box>
          <Stack justify='space-between' spacing='64px' align='start' mt='72px'>
            <Stack direction='column' spacing='48px' flex='1 1 auto'>
              <Stack justify='flex-end'>
                <Button variant='text' size='sm' onClick={() => dispatch(clearCart())}>
                  Rimuovi tutto
                </Button>
              </Stack>
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  return (
                    <Box key={item.id}>
                      <Stack justify='space-between' align='start'>
                        <Stack spacing='24px'>
                          <Box
                            position='relative'
                            overflow='hidden'
                            maxWidth='160px'
                            maxHeight='90px'
                            borderRadius='4px'
                            width='100%'
                            height='100%'
                            transform='translateZ(0)'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                          >
                            <img
                              src={item.url}
                              alt='library'
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </Box>
                          <Stack
                            direction='column'
                            align='start'
                            justify='space-between'
                          >
                            <Box color='purple.300'>
                              <h5>Categoria</h5>
                            </Box>
                            <Box>
                              <h6
                                style={{
                                  color: "grey.700",
                                }}
                              >
                                Artista
                              </h6>

                              <p>Titolo - {item.likes}€</p>
                            </Box>
                          </Stack>
                        </Stack>
                        <Button
                          onClick={() => {
                            dispatch(removeFromCart(item));
                          }}
                          variant='text'
                          size='md'
                          iconColor='purple.300'
                          rightIcon={<RiDeleteBack2Fill size={24} />}
                        ></Button>
                      </Stack>
                    </Box>
                  );
                })
              ) : (
                <h4>Nessun Elemento nel Carrello</h4>
              )}
            </Stack>

            <Box
              border='1px solid'
              borderColor='grey.700'
              borderRadius='8px'
              px='36px'
              py='56px'
              bg='grey.900'
              maxWidth='534px'
            >
              <Box mb='36px'>
                <h3>Dati di pagamento</h3>
              </Box>
              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting}) => {
                  setSubmitting(true);
                  setTimeout(() =>{
                  alert(JSON.stringify(values));
                  setSubmitting(false);
                },1000)}
                }
              >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                dirty,
              }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing='36px'>
                      <Stack justify='space-between' align='center'>
                        <Box>
                          <InputWrapper
                            onChange={handleChange}
                            value={values.name}
                            width='200px'
                            name='name'
                            onBlur={handleBlur}
                            borderColor={errors.name ? "var(--error)" : "initial"}
                            placeholder='nome'
                          />
                          {touched.name && errors.name ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.name}
                            </p>
                          ) : (
                            <div
                              style={{
                                height: "8px",
                              }}
                            ></div>
                          )}
                        </Box>
                        <Box>
                          <InputWrapper
                            onChange={handleChange}
                            value={values.cognome}
                            width='200px'
                            name='cognome'
                            placeholder='cognome'
                            borderColor={errors.cognome ? "var(--error)" : "initial"}
                            onBlur={handleBlur}
                          />
                          {touched.cognome && errors.cognome ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.cognome}
                            </p>
                          ) : (
                            <div
                              style={{
                                height: "8px",
                              }}
                            ></div>
                          )}
                        </Box>
                      </Stack>
                      <Box width='100%'>
                        <InputWrapper
                          width='100%'
                          onChange={handleChange}
                          value={values.card}
                          placeholder='carta di credito'
                          borderColor={errors.card ? "var(--error)" : "initial"}
                          name='card'
                          onBlur={handleBlur}
                        />
                        {touched.card && errors.card ? (
                          <p
                            style={{
                              color: "var(--error)",
                              marginTop: "6px",
                              fontSize: "8px",
                              textAlign: "right",
                            }}
                          >
                            {errors.card}
                          </p>
                        ) : (
                          <div
                            style={{
                              height: "8px",
                            }}
                          ></div>
                        )}
                      </Box>
                      <Stack spacing='10px' align='center'>
                        <Box>
                          <InputWrapper
                            onChange={handleChange}
                            value={values.address}
                            width='238px'
                            name='address'
                            placeholder='Indirizzo'
                            borderColor={errors.address ? "var(--error)" : "initial"}
                            onBlur={handleBlur}
                          />
                          {touched.address && errors.address ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.address}
                            </p>
                          ) : (
                            <div
                              style={{
                                height: "8px",
                              }}
                            ></div>
                          )}
                        </Box>
                        <Box>
                          <InputWrapper
                            onChange={handleChange}
                            value={values.civico}
                            width='100px'
                            name='civico'
                            placeholder='Numero'
                            borderColor={errors.civico ? "var(--error)" : "initial"}
                            onBlur={handleBlur}
                          />
                          {touched.civico && errors.civico ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.civico}
                            </p>
                          ) : (
                            <div
                              style={{
                                height: "8px",
                              }}
                            ></div>
                          )}
                        </Box>
                        <Box>
                          <InputWrapper
                            onChange={handleChange}
                            value={values.cap}
                            width='100px'
                            name='cap'
                            placeholder='CAP'
                            borderColor={errors.name ? "var(--error)" : "initial"}
                            onBlur={handleBlur}
                          />
                          {touched.cap && errors.cap ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.cap}
                            </p>
                          ) : (
                            <div
                              style={{
                                height: "8px",
                              }}
                            ></div>
                          )}
                        </Box>
                      </Stack>
                      <Stack justify='space-between' align='center'>
                        <h2>{total} €</h2>
                        <Button
                          type='submit'
                          variant={
                            isSubmitting || !isValid || !dirty ? "disabled" : "contained"
                          }
                          size='md'
                          disabled={isSubmitting}
                        >
                          Procedi all'acquisto
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                )
              }
            </Formik> 
          </Box>
          </Stack>
        </Container>
      </Container>
    </Layout>           
  );
};

  

export default CheckoutScreen;
