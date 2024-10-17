import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex direction="column" bg="white-" color="black" minH="100vh">
      <Flex
        bg="#848ef9"
        p={4}
        justify="center"
        align="center"
        boxShadow="lg"
        mb={6}
      >
        <Heading size="lg" color="white" flex="1" textAlign="left">Gerenciar Usuário / Cadastrar / Editar / Deletar</Heading>
      </Flex>

      <Flex
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
        flex="1"
      >
        <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
          <Button
            bg="#848ef9"
            borderRadius="50px"
            color="white"
            onClick={() => [setDataEdit({}), onOpen()]}
            _hover={{ bg: "#6c7de9" }}
          >
            Cadastro Usuário
          </Button>

          <Box overflowY="auto" height="50%">
            <Table mt="6" variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize="16px" color="black">
                    Nome
                  </Th>
                  <Th fontSize="16px" color="black">
                    E-Mail
                  </Th>
                  <Th fontSize="16px" color="black">
                    Telefone
                  </Th>
                  <Th fontSize="16px" color="black">
                    Data de Nascimento
                  </Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(({ name, email, phone, dob }, index) => (
                  <Tr
                    key={index}
                    cursor="pointer "
                    _hover={{ bg: "#848ef9", color: "black" }}
                  >
                    <Td>{name}</Td>
                    <Td>{email}</Td>
                    <Td>{phone}</Td>
                    <Td>{dob}</Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        mr={8} 
                        onClick={() => [
                          setDataEdit({ name, email, phone, dob, index }),
                          onOpen(),
                        ]}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(email)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>

      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
