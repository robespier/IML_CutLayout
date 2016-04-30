#IML Cut Layout

Моделирование раскладки контуров высечки для In-mould-этикеток.

##Цель

* Упростить процесс создания раскладки контуров. Пользователю не нужно разбираться в инструментарии `Adobe Illustrator`, чтобы сверстать необходимый файл для предварительного просчета стоимости заказа и заказа высекательного штампа.

##Задача

* Необходимо разработать программу моделирования раскладки контуров высечек для In-mould-этикеток на листе определенного формата.

##Требования

* В качестве контуров могут выступать как стандартные геометрические фигуры (прямоугольник, квадрат, круг, овал, n-угольник, звезда и т.д.), так и пользовательские фигуры сложной формы (колье, "банан", крест, капля и т.п).

* Способов раскладки тоже может быть несколько:
** регулярная раскладка на основе прямоугольной или треугольной сетки для контуров небольшого размера
** нерегулярная раскладка (со смещением и/или поворотом элементов) для контуров большого размера, не умещающихся по габаритам в прямоугольную область раскладки.

* Необходимо учитывать следующие технологические требования:
** отступ на вылет этикетки составляет 1,5÷3 мм.
** контуры (с учетом отступа) не должны пересекаться друг с другом
** предпочтительна регулярная раскладка с явным количеством ручьев (полос)

* Также необходимо предусмотреть сохранение различных вариантов раскладки для последующего сравнения и выбора оптимального варианта.

* Кроме непосредственной раскладки контуров, программа должна формировать и выводить отчет по расходу материала для каждого варианта раскладки. Отчет может включать следующие данные:
** количество необходимого материала (в метрах), исходя из тиражности заказа (кол-во этикеток)
** количество облоя материала (в процентах и/или метрах).

* В качестве входных данных могут выступать следующие параметры:
** тираж (шт.)
** тип/наименование материала
** ширина пореза материала (мм)
** диаметр/длина вала (мм)
** тип лакирования

* Необходимо разработать понятный и удобный интерфейс для решения основных задач пользователя:
** предварительная раскладка контуров для просчета стоимости заказа (под разные порезы/валы)
** окончательная раскладка (под конкретный порез/вал) для заказа высекательного штампа

##Реализация

* Программа IML Cut Layout может быть реализована как расширение (extension) для Adobe Illustrator CC 2015.
