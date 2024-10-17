import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [phone, setPhone] = useState(dataEdit.phone || "");
    const [dob, setDob] = useState(dataEdit.dob || "");
  
    const handleSave = () => {
      if (!name || !email || !phone || !dob) return;
  
      if (emailAlreadyExists()) {
        return alert("E-mail já cadastrado!");
      }
  
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { name, email, phone, dob };
      }
  
      const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { name, email, phone, dob }]
        : [...(data ? data : [])];
  
      localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
  
      setData(newDataArray);
  
      onClose();
    };
  
    const emailAlreadyExists = () => {
      if (dataEdit.email !== email && data?.length) {
        return data.find((item) => item.email === email);
      }
  
      return false;
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Telefone</FormLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Data de Nascimento</FormLabel>
                <Input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>
  
          <ModalFooter justifyContent="start">
            <Button colorScheme="green" borderRadius="50px" mr={4} onClick={handleSave}>
              Salvar
            </Button>
            <Button colorScheme="red" borderRadius="50px" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ModalComp;
  