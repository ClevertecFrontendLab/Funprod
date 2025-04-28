// import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
// import {
//     Box,
//     Button,
//     Checkbox,
//     Flex,
//     IconButton,
//     Image,
//     Input,
//     Popover,
//     PopoverArrow,
//     PopoverBody,
//     PopoverContent,
//     PopoverTrigger,
//     Text,
//     useDisclosure,
// } from '@chakra-ui/react';
// import { useState } from 'react';

// import { AddOtherAllergen } from './AddOtherAllergen/AddOtherAllergen';

// const options = [
//     'Молочные продукты',
//     'Яйцо',
//     'Рыба',
//     'Моллюски',
//     'Орехи',
//     'Томат (помидор)',
//     'Цитрусовые',
//     'Клубника (ягоды)',
//     'Шоколад',
// ];

// export const CustomSelect = ({
//     isActive,
//     selectedOptions = [],
//     onChange = () => {},
//     callback = () => {},
// }: {
//     isActive: boolean;
//     selectedOptions?: string[];
//     onChange?: (val: string[]) => void;
//     callback?: (val: boolean) => void;
// }) => {
//     // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     // const [newAllergen, setNewAllergen] = useState<string>('');

//     const handleToggle = (option: string) => {
//         const updated = selectedOptions.includes(option)
//             ? selectedOptions.filter((item) => item !== option) // исключаем аллерген, если он уже есть
//             : [...selectedOptions, option]; // добавляем, если его нет
//         onChange(updated);
//     };

//     // const addNewAllergen = () => {
//     //     if (newAllergen && !selectedOptions.includes(newAllergen)) {
//     //         onChange([...selectedOptions, newAllergen.toLocaleLowerCase()]);
//     //         setNewAllergen('');
//     //     }
//     // };

//     const clearSelection = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         onChange([]);
//     };

//     const handleOpen = () => {
//         callback(true);
//         onOpen();
//     };

//     const handleClose = () => {
//         callback(false);
//         onClose();
//     };

//     const displayText =
//         selectedOptions.length > 0
//             ? selectedOptions.map((item) => {
//                   const cleanLabel = item.replace(/\s*\(.*?\)\s*/g, '').trim();
//                   return (
//                       <Box
//                           as='span'
//                           key={item}
//                           border='1px solid #c4ff61'
//                           padding='0 8px'
//                           borderRadius='4px'
//                           mr='6px'
//                       >
//                           {cleanLabel}
//                       </Box>
//                   );
//               })
//             : 'Выберите из списка...';

//     return (
//         <Flex maxW='400px' w='100%'>
//             <Popover
//                 isOpen={isOpen}
//                 onOpen={handleOpen}
//                 onClose={handleClose}
//                 placement='bottom-start'
//                 modifiers={[
//                     {
//                         name: 'preventOverflow',
//                         options: {
//                             padding: 0,
//                             altBoundary: false,
//                             rootBoundary: 'document',
//                             tether: false,
//                         },
//                     },
//                     {
//                         name: 'flip',
//                         enabled: false,
//                     },
//                 ]}
//             >
//                 <PopoverTrigger>
//                     <Button
//                         data-test-id='allergens-menu-button'
//                         rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
//                         isDisabled={isActive}
//                         maxW='400px'
//                         w='100%'
//                         minH='auto'
//                         height='auto'
//                         textOverflow='ellipsis'
//                         display='flex'
//                         justifyContent='space-between'
//                         alignItems='center'
//                         position='relative'
//                         bg='transparent'
//                         border={!isActive ? '1px solid #c4ff61' : '1px solid gray'}
//                         p='0 12px 0 0'
//                     >
//                         <Flex
//                             w='182px'
//                             wrap='wrap'
//                             overflow='hidden'
//                             as='span'
//                             p='12px 16px'
//                             gap='4px'
//                             color={selectedOptions.length > 0 ? 'green' : 'rgba(0, 0, 0, 0.64)'}
//                             fontSize={selectedOptions.length > 0 ? '12px' : '16px'}
//                             fontWeight={selectedOptions.length > 0 ? '500' : '400'}
//                         >
//                             {displayText}
//                         </Flex>
//                         {selectedOptions.length > 0 && (
//                             <IconButton
//                                 icon={<CloseIcon w='9px' h='9px' />}
//                                 size='xs'
//                                 variant='link'
//                                 color='gray'
//                                 onClick={clearSelection}
//                                 aria-label='Очистить выбор'
//                                 position='absolute'
//                                 right='20px'
//                             />
//                         )}
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent
//                     maxHeight='336px'
//                     overflowY='hidden'
//                     maxW='400px'
//                     w='100%'
//                     minW='284px'
//                 >
//                     <PopoverArrow />
//                     <PopoverBody p='0' minW='269px' data-test-id='allergens-menu'>
//                         {options.map((option, i) => (
//                             <Flex
//                                 key={option}
//                                 align='center'
//                                 onClick={(e) => e.stopPropagation()}
//                                 bg={i % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : 'transparent'}
//                                 h='32px'
//                             >
//                                 <Checkbox
//                                     data-test-id={`allergen-${i}`}
//                                     isChecked={selectedOptions.includes(option)}
//                                     onChange={() => handleToggle(option)}
//                                     mr='4px'
//                                     ml='16px'
//                                     borderColor='#b1ff2e'
//                                     iconColor='black'
//                                     colorScheme='#b1ff2e'
//                                     _checked={{
//                                         '& .chakra-checkbox__control': {
//                                             bg: '#b1ff2e',
//                                         },
//                                     }}
//                                 >
//                                     <Text fontWeight='400' fontSize='12px' lineHeight='143%'>
//                                         {option}
//                                     </Text>
//                                 </Checkbox>
//                             </Flex>
//                         ))}
//                         <AddOtherAllergen onChange={onChange} selectedOptions={selectedOptions} />
//                     </PopoverBody>
//                 </PopoverContent>
//             </Popover>
//         </Flex>
//     );
// };
