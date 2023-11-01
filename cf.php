<?php

namespace UserTypes;

use Bitrix\Main\UserField\Types\StringFormattedType;

class Heart
{
    public static function GetUserTypeDescription()
    {
        return array(
            'PROPERTY_TYPE' => 'S',  // тип поля
            'USER_TYPE' => 'iblock_slinked', // код типа пользовательского свойства
            'DESCRIPTION' => 'Кастомное поле', // название типа пользовательского свойства
            'GetPropertyFieldHtml' => array(self::class, 'GetPropertyFieldHtml'), // метод отображения свойства
            'GetPublicViewHTML' => array(self::class, 'GetPublicViewHTML'), // метод отображения значения
        );
    }
    public static function GetPropertyFieldHtml($arProperty, $value, $strHTMLControlName)
    {
    }
    public static function GetPublicViewHTML($arProperty, $value, $strHTMLControlName)
    {
        $IBlockID = 19;
        $elementID = $arProperty['ELEMENT_ID'];
        $list = \LKIBlock::getIblockAllFieldsWithFilter('DOC_SIM', array('ID' => $elementID, 'IBLOCK_ID' => $IBlockID));
        $output = '';
        foreach ($list as $elementData) {
            if (isset($elementData['PROPS']['PROCEDURES']['VALUE']) && is_array($elementData['PROPS']['PROCEDURES']['VALUE'])) {
            $proceduresValues = $elementData['PROPS']['PROCEDURES']['VALUE'];

            foreach ($proceduresValues as $value) {
                $procedureElement = \CIBlockElement::GetByID($value)->GetNext();

                if ($procedureElement) {
                $output .='<a class="otus_popup_window" data-procedure-id='. $procedureElement['NAME'] .'> '. $procedureElement['NAME'] . '</a> <br>';
                }
            }
        }
        }
        return $output;
    }
}




