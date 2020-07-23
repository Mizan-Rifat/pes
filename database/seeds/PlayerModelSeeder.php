<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlayerModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $models = [
            [
            "id"=> 1,
            "name"=> "C. RONALDO",
            "model_id"=> 4522,
            "position"=> "LWF"
            ],
            [
            "id"=> 2,
            "name"=> "L. MESSI",
            "model_id"=> 7511,
            "position"=> "RWF"
            ],
            [
            "id"=> 3,
            "name"=> "NEYMAR",
            "model_id"=> 40352,
            "position"=> "LWF"
            ],
            [
            "id"=> 4,
            "name"=> "S. AGUERO",
            "model_id"=> 33702,
            "position"=> "CF"
            ],
            [
            "id"=> 5,
            "name"=> "L. SUAREZ",
            "model_id"=> 34881,
            "position"=> "CF"
            ],
            [
            "id"=> 6,
            "name"=> "E. HAZARD",
            "model_id"=> 36998,
            "position"=> "LWF"
            ],
            [
            "id"=> 7,
            "name"=> "V. VAN DIJK",
            "model_id"=> 44840,
            "position"=> "CB"
            ],
            [
            "id"=> 8,
            "name"=> "SERGIO RAMOS",
            "model_id"=> 7329,
            "position"=> "CB"
            ],
            [
            "id"=> 9,
            "name"=> "PIQUE",
            "model_id"=> 8639,
            "position"=> "CB"
            ],
            [
            "id"=> 10,
            "name"=> "R. LEWANDOWSKI",
            "model_id"=> 40002,
            "position"=> "CF"
            ],
            [
            "id"=> 11,
            "name"=> "DAVID DE GEA",
            "model_id"=> 40571,
            "position"=> "GK"
            ],
            [
            "id"=> 12,
            "name"=> "A. GRIEZMANN",
            "model_id"=> 42316,
            "position"=> "CF"
            ],
            [
            "id"=> 13,
            "name"=> "J. OBLAK",
            "model_id"=> 44104,
            "position"=> "GK"
            ],
            [
            "id"=> 14,
            "name"=> "K. DE BRUYNE",
            "model_id"=> 44379,
            "position"=> "AMF"
            ],
            [
            "id"=> 15,
            "name"=> "H. KANE",
            "model_id"=> 47287,
            "position"=> "CF"
            ],
            [
            "id"=> 16,
            "name"=> "M. SALAH",
            "model_id"=> 57123,
            "position"=> "RWF"
            ],
            [
            "id"=> 17,
            "name"=> "ALISSON",
            "model_id"=> 63474,
            "position"=> "GK"
            ],
            [
            "id"=> 18,
            "name"=> "K. MBAPPE",
            "model_id"=> 110718,
            "position"=> "CF"
            ],
            [
            "id"=> 19,
            "name"=> "M. NEUER",
            "model_id"=> 33185,
            "position"=> "GK"
            ],
            [
            "id"=> 20,
            "name"=> "L. MODRIC",
            "model_id"=> 34098,
            "position"=> "CMF"
            ],
            [
            "id"=> 21,
            "name"=> "BUSQUETS",
            "model_id"=> 38568,
            "position"=> "DMF"
            ],
            [
            "id"=> 22,
            "name"=> "R. STERLING",
            "model_id"=> 45268,
            "position"=> "LWF"
            ],
            [
            "id"=> 23,
            "name"=> "EDERSON",
            "model_id"=> 46815,
            "position"=> "GK"
            ],
            [
            "id"=> 24,
            "name"=> "S. MANE",
            "model_id"=> 57304,
            "position"=> "LWF"
            ],
            [
            "id"=> 25,
            "name"=> "M. TER STEGEN",
            "model_id"=> 61672,
            "position"=> "GK"
            ],
            [
            "id"=> 26,
            "name"=> "K. BENZEMA",
            "model_id"=> 8944,
            "position"=> "CF"
            ],
            [
            "id"=> 27,
            "name"=> "DAVID SILVA",
            "model_id"=> 33237,
            "position"=> "AMF"
            ],
            [
            "id"=> 28,
            "name"=> "E. CAVANI",
            "model_id"=> 35477,
            "position"=> "CF"
            ],
            [
            "id"=> 29,
            "name"=> "T. KROOS",
            "model_id"=> 36770,
            "position"=> "CMF"
            ],
            [
            "id"=> 30,
            "name"=> "P. AUBAMEYANG",
            "model_id"=> 40323,
            "position"=> "CF"
            ],
            [
            "id"=> 31,
            "name"=> "C. ERIKSEN",
            "model_id"=> 40871,
            "position"=> "AMF"
            ],
            [
            "id"=> 32,
            "name"=> "THIAGO A.",
            "model_id"=> 41126,
            "position"=> "CMF"
            ],
            [
            "id"=> 33,
            "name"=> "P. POGBA",
            "model_id"=> 45023,
            "position"=> "CMF"
            ],
            [
            "id"=> 34,
            "name"=> "N. KANTÉ",
            "model_id"=> 101334,
            "position"=> "CMF"
            ],
            [
            "id"=> 35,
            "name"=> "K. KOULIBALY",
            "model_id"=> 102757,
            "position"=> "CB"
            ],
            [
            "id"=> 36,
            "name"=> "BERNARDO SILVA",
            "model_id"=> 104226,
            "position"=> "RWF"
            ],
            [
            "id"=> 37,
            "name"=> "H. LLORIS",
            "model_id"=> 8574,
            "position"=> "GK"
            ],
            [
            "id"=> 38,
            "name"=> "G. CHIELLINI",
            "model_id"=> 8851,
            "position"=> "CB"
            ],
            [
            "id"=> 39,
            "name"=> "D. GODÍN",
            "model_id"=> 34475,
            "position"=> "CB"
            ],
            [
            "id"=> 40,
            "name"=> "G. BALE",
            "model_id"=> 35496,
            "position"=> "RWF"
            ],
            [
            "id"=> 41,
            "name"=> "JORDI ALBA",
            "model_id"=> 40425,
            "position"=> "LB"
            ],
            [
            "id"=> 42,
            "name"=> "A. LACAZETTE",
            "model_id"=> 40507,
            "position"=> "CF"
            ],
            [
            "id"=> 43,
            "name"=> "P. COUTINHO",
            "model_id"=> 42641,
            "position"=> "LWF"
            ],
            [
            "id"=> 44,
            "name"=> "R. VARANE",
            "model_id"=> 43076,
            "position"=> "CB"
            ],
            [
            "id"=> 45,
            "name"=> "T. COURTOIS",
            "model_id"=> 44383,
            "position"=> "GK"
            ],
            [
            "id"=> 46,
            "name"=> "M. REUS",
            "model_id"=> 45944,
            "position"=> "AMF"
            ],
            [
            "id"=> 47,
            "name"=> "M. VERRATTI",
            "model_id"=> 46003,
            "position"=> "CMF"
            ],
            [
            "id"=> 48,
            "name"=> "P. DYBALA",
            "model_id"=> 47179,
            "position"=> "SS"
            ],
            [
            "id"=> 49,
            "name"=> "SAÚL",
            "model_id"=> 63497,
            "position"=> "CMF"
            ],
            [
            "id"=> 50,
            "name"=> "ROBERTO FIRMINO",
            "model_id"=> 105029,
            "position"=> "CF"
            ],
            [
            "id"=> 51,
            "name"=> "J. KIMMICH",
            "model_id"=> 109005,
            "position"=> "RB"
            ],
            [
            "id"=> 52,
            "name"=> "M. ŠKRINIAR",
            "model_id"=> 111174,
            "position"=> "CB"
            ],
            [
            "id"=> 53,
            "name"=> "FERNANDINHO",
            "model_id"=> 31052,
            "position"=> "DMF"
            ],
            [
            "id"=> 54,
            "name"=> "J. VERTONGHEN",
            "model_id"=> 34905,
            "position"=> "CB"
            ],
            [
            "id"=> 55,
            "name"=> "MARCELO",
            "model_id"=> 34908,
            "position"=> "LB"
            ],
            [
            "id"=> 56,
            "name"=> "A. VIDAL",
            "model_id"=> 36714,
            "position"=> "CMF"
            ],
            [
            "id"=> 57,
            "name"=> "Á. DI MARÍA",
            "model_id"=> 37106,
            "position"=> "RWF"
            ],
            [
            "id"=> 58,
            "name"=> "E. DŽEKO",
            "model_id"=> 37638,
            "position"=> "CF"
            ],
            [
            "id"=> 59,
            "name"=> "T. ALDERWEIRELD",
            "model_id"=> 38796,
            "position"=> "CB"
            ],
            [
            "id"=> 60,
            "name"=> "THIAGO SILVA",
            "model_id"=> 39173,
            "position"=> "CB"
            ],
            [
            "id"=> 61,
            "name"=> "T. MÜLLER",
            "model_id"=> 40714,
            "position"=> "SS"
            ],
            [
            "id"=> 62,
            "name"=> "D. MERTENS",
            "model_id"=> 40065,
            "position"=> "CF"
            ],
            [
            "id"=> 63,
            "name"=> "K. MANOLAS",
            "model_id"=> 40097,
            "position"=> "CB"
            ],
            [
            "id"=> 64,
            "name"=> "R. LUKAKU",
            "model_id"=> 40122,
            "position"=> "CF"
            ],
            [
            "id"=> 65,
            "name"=> "J. BOATENG",
            "model_id"=> 40350,
            "position"=> "CB"
            ],
            [
            "id"=> 66,
            "name"=> "DOUGLAS COSTA",
            "model_id"=> 40850,
            "position"=> "RWF"
            ],
            [
            "id"=> 67,
            "name"=> "S. DE VRIJ",
            "model_id"=> 40875,
            "position"=> "CB"
            ],
            [
            "id"=> 68,
            "name"=> "K. WALKER",
            "model_id"=> 41119,
            "position"=> "RB"
            ],
            [
            "id"=> 69,
            "name"=> "A. GÓMEZ",
            "model_id"=> 42630,
            "position"=> "SS"
            ],
            [
            "id"=> 70,
            "name"=> "ALEX SANDRO",
            "model_id"=> 43985,
            "position"=> "LB"
            ],
            [
            "id"=> 71,
            "name"=> "F. THAUVIN",
            "model_id"=> 46487,
            "position"=> "RMF"
            ],
            [
            "id"=> 72,
            "name"=> "IAGO ASPAS",
            "model_id"=> 46666,
            "position"=> "CF"
            ],
            [
            "id"=> 73,
            "name"=> "M. DEPAY",
            "model_id"=> 46879,
            "position"=> "CF"
            ],
            [
            "id"=> 74,
            "name"=> "H. ZIYECH",
            "model_id"=> 47002,
            "position"=> "AMF"
            ],
            [
            "id"=> 75,
            "name"=> "A. ROMAGNOLI",
            "model_id"=> 47190,
            "position"=> "CB"
            ],
            [
            "id"=> 76,
            "name"=> "J. PICKFORD",
            "model_id"=> 47286,
            "position"=> "GK"
            ],
            [
            "id"=> 77,
            "name"=> "J. STONES",
            "model_id"=> 47785,
            "position"=> "CB"
            ],
            [
            "id"=> 78,
            "name"=> "JOÃO CANCELO",
            "model_id"=> 47787,
            "position"=> "RB"
            ],
            [
            "id"=> 79,
            "name"=> "CARVAJAL",
            "model_id"=> 57353,
            "position"=> "RB"
            ],
            [
            "id"=> 80,
            "name"=> "J. GIMÉNEZ",
            "model_id"=> 58839,
            "position"=> "CB"
            ],
            [
            "id"=> 81,
            "name"=> "JORGINHO",
            "model_id"=> 59458,
            "position"=> "DMF"
            ],
            [
            "id"=> 82,
            "name"=> "N. FEKIR",
            "model_id"=> 59838,
            "position"=> "AMF"
            ],
            [
            "id"=> 83,
            "name"=> "L. GORETZKA",
            "model_id"=> 60380,
            "position"=> "CMF"
            ],
            [
            "id"=> 84,
            "name"=> "BRUNO FERNANDES",
            "model_id"=> 60512,
            "position"=> "AMF"
            ],
            [
            "id"=> 85,
            "name"=> "R. MAHREZ",
            "model_id"=> 61725,
            "position"=> "RWF"
            ],
            [
            "id"=> 86,
            "name"=> "FABINHO",
            "model_id"=> 63607,
            "position"=> "DMF"
            ],
            [
            "id"=> 87,
            "name"=> "A. ROBERTSON",
            "model_id"=> 101028,
            "position"=> "LB"
            ],
            [
            "id"=> 88,
            "name"=> "C. LENGLET",
            "model_id"=> 104418,
            "position"=> "CB"
            ],
            [
            "id"=> 89,
            "name"=> "L. HERNANDEZ",
            "model_id"=> 104717,
            "position"=> "CB"
            ],
            [
            "id"=> 90,
            "name"=> "GABRIEL JESUS",
            "model_id"=> 108200,
            "position"=> "CF"
            ],
            [
            "id"=> 91,
            "name"=> "G. DONNARUMMA",
            "model_id"=> 108279,
            "position"=> "GK"
            ],
            [
            "id"=> 92,
            "name"=> "F. DE JONG",
            "model_id"=> 108662,
            "position"=> "CMF"
            ],
            [
            "id"=> 93,
            "name"=> "RODRI",
            "model_id"=> 110815,
            "position"=> "DMF"
            ],
            [
            "id"=> 94,
            "name"=> "N. SÜLE",
            "model_id"=> 116136,
            "position"=> "CB"
            ],
            [
            "id"=> 95,
            "name"=> "T. WERNER",
            "model_id"=> 116652,
            "position"=> "CF"
            ],
            [
            "id"=> 96,
            "name"=> "G. BUFFON",
            "model_id"=> 983,
            "position"=> "GK"
            ],
            [
            "id"=> 97,
            "name"=> "V. KOMPANY",
            "model_id"=> 5770,
            "position"=> "CB"
            ],
            [
            "id"=> 98,
            "name"=> "K. SCHMEICHEL",
            "model_id"=> 9042,
            "position"=> "GK"
            ],
            [
            "id"=> 99,
            "name"=> "F. RIBÉRY",
            "model_id"=> 9129,
            "position"=> "LWF"
            ],
            [
            "id"=> 100,
            "name"=> "JOÃO MOUTINHO",
            "model_id"=> 9138,
            "position"=> "CMF"
            ],
            [
            "id"=> 101,
            "name"=> "F. QUAGLIARELLA",
            "model_id"=> 32199,
            "position"=> "CF"
            ],
            [
            "id"=> 102,
            "name"=> "G. HIGUAÍN",
            "model_id"=> 33633,
            "position"=> "CF"
            ],
            [
            "id"=> 103,
            "name"=> "M. BENATIA",
            "model_id"=> 33643,
            "position"=> "CB"
            ],
            [
            "id"=> 104,
            "name"=> "M. HAMŠÍK",
            "model_id"=> 33799,
            "position"=> "CMF"
            ],
            [
            "id"=> 105,
            "name"=> "RUI PATRÍCIO",
            "model_id"=> 34868,
            "position"=> "GK"
            ],
            [
            "id"=> 106,
            "name"=> "S. RUFFIER",
            "model_id"=> 35002,
            "position"=> "GK"
            ],
            [
            "id"=> 107,
            "name"=> "LUCAS LEIVA",
            "model_id"=> 35878,
            "position"=> "DMF"
            ],
            [
            "id"=> 108,
            "name"=> "G. WIJNALDUM",
            "model_id"=> 36288,
            "position"=> "CMF"
            ],
            [
            "id"=> 109,
            "name"=> "Y. SOMMER",
            "model_id"=> 36627,
            "position"=> "GK"
            ],
            [
            "id"=> 110,
            "name"=> "O. GIROUD",
            "model_id"=> 38627,
            "position"=> "CF"
            ],
            [
            "id"=> 111,
            "name"=> "DANI PAREJO",
            "model_id"=> 38779,
            "position"=> "CMF"
            ],
            [
            "id"=> 112,
            "name"=> "K. NAVAS",
            "model_id"=> 39777,
            "position"=> "GK"
            ],
            [
            "id"=> 113,
            "name"=> "J. HENDERSON",
            "model_id"=> 40295,
            "position"=> "CMF"
            ],
            [
            "id"=> 114,
            "name"=> "L. KOSCIELNY",
            "model_id"=> 40340,
            "position"=> "CB"
            ],
            [
            "id"=> 115,
            "name"=> "M. PERIN",
            "model_id"=> 40525,
            "position"=> "GK"
            ],
            [
            "id"=> 116,
            "name"=> "N. OTAMENDI",
            "model_id"=> 40725,
            "position"=> "CB"
            ],
            [
            "id"=> 117,
            "name"=> "ANTHONY LOPES",
            "model_id"=> 40990,
            "position"=> "GK"
            ],
            [
            "id"=> 118,
            "name"=> "R. NAINGGOLAN",
            "model_id"=> 41046,
            "position"=> "CMF"
            ],
            [
            "id"=> 119,
            "name"=> "N. TAGLIAFICO",
            "model_id"=> 41596,
            "position"=> "LB"
            ],
            [
            "id"=> 120,
            "name"=> "W. BEN YEDDER",
            "model_id"=> 42296,
            "position"=> "CF"
            ],
            [
            "id"=> 121,
            "name"=> "M. BENATIA",
            "model_id"=> 1073775467,
            "position"=> "CB"
            ],
            [
            "id"=> 122,
            "name"=> "PAULINHO",
            "model_id"=> 1073784499,
            "position"=> "CMF"
            ],
            [
            "id"=> 123,
            "name"=> "TALISCA",
            "model_id"=> 1073805333,
            "position"=> "AMF"
            ],
            [
            "id"=> 124,
            "name"=> "J. MILNER",
            "model_id"=> 4882,
            "position"=> "CMF"
            ],
            [
            "id"=> 125,
            "name"=> "ALBIOL",
            "model_id"=> 5518,
            "position"=> "CB"
            ],
            [
            "id"=> 126,
            "name"=> "SANTI CAZORLA",
            "model_id"=> 9375,
            "position"=> "CMF"
            ],
            [
            "id"=> 127,
            "name"=> "HULK",
            "model_id"=> 15038,
            "position"=> "RWF"
            ],
            [
            "id"=> 128,
            "name"=> "R. FALCAO",
            "model_id"=> 31044,
            "position"=> "CF"
            ],
            [
            "id"=> 129,
            "name"=> "L. LÓPEZ",
            "model_id"=> 32436,
            "position"=> "CF"
            ],
            [
            "id"=> 130,
            "name"=> "S. SIRIGU",
            "model_id"=> 32764,
            "position"=> "GK"
            ],
            [
            "id"=> 131,
            "name"=> "D. PAYET",
            "model_id"=> 34611,
            "position"=> "AMF"
            ],
            [
            "id"=> 132,
            "name"=> "F. MUSLERA",
            "model_id"=> 36727,
            "position"=> "GK"
            ],
            [
            "id"=> 133,
            "name"=> "A. KOLAROV",
            "model_id"=> 36764,
            "position"=> "LB"
            ],
            [
            "id"=> 134,
            "name"=> "M. SISSOKO",
            "model_id"=> 37035,
            "position"=> "CMF"
            ],
            [
            "id"=> 135,
            "name"=> "C. STUANI",
            "model_id"=> 37304,
            "position"=> "CF"
            ],
            [
            "id"=> 136,
            "name"=> "JOSÉ CALLEJÓN",
            "model_id"=> 38120,
            "position"=> "RWF"
            ],
            [
            "id"=> 137,
            "name"=> "PEDRO",
            "model_id"=> 38567,
            "position"=> "RWF"
            ],
            [
            "id"=> 138,
            "name"=> "P. GULÁCSI",
            "model_id"=> 38784,
            "position"=> "GK"
            ],
            [
            "id"=> 139,
            "name"=> "S. EL SHAARAWY",
            "model_id"=> 38858,
            "position"=> "LWF"
            ],
            [
            "id"=> 140,
            "name"=> "J. ZOET",
            "model_id"=> 39161,
            "position"=> "GK"
            ],
            [
            "id"=> 141,
            "name"=> "X. SHAQIRI",
            "model_id"=> 40422,
            "position"=> "RMF"
            ],
            [
            "id"=> 142,
            "name"=> "J. CUADRADO",
            "model_id"=> 40631,
            "position"=> "RMF"
            ],
            [
            "id"=> 143,
            "name"=> "J. MATIP",
            "model_id"=> 41135,
            "position"=> "CB"
            ],
            [
            "id"=> 144,
            "name"=> "I. GUEYE",
            "model_id"=> 42575,
            "position"=> "CMF"
            ],
            [
            "id"=> 145,
            "name"=> "SERGI ROBERTO",
            "model_id"=> 42892,
            "position"=> "RB"
            ],
            [
            "id"=> 146,
            "name"=> "PABLO SARABIA",
            "model_id"=> 43262,
            "position"=> "RMF"
            ],
            [
            "id"=> 147,
            "name"=> "G. SIGURÐSSON",
            "model_id"=> 43421,
            "position"=> "AMF"
            ],
            [
            "id"=> 148,
            "name"=> "DUDU",
            "model_id"=> 43695,
            "position"=> "RMF"
            ],
            [
            "id"=> 149,
            "name"=> "FELIPE ANDERSON",
            "model_id"=> 44620,
            "position"=> "LMF"
            ],
            [
            "id"=> 150,
            "name"=> "S. BERGHUIS",
            "model_id"=> 44849,
            "position"=> "RWF"
            ],
            [
            "id"=> 151,
            "name"=> "G. XHAKA",
            "model_id"=> 42424,
            "position"=> "DMF"
            ],
            [
            "id"=> 152,
            "name"=> "PAULINHO",
            "model_id"=> 42675,
            "position"=> "CMF"
            ],
            [
            "id"=> 153,
            "name"=> "A. AREOLA",
            "model_id"=> 42825,
            "position"=> "GK"
            ],
            [
            "id"=> 154,
            "name"=> "LUCAS MOURA",
            "model_id"=> 42898,
            "position"=> "RWF"
            ],
            [
            "id"=> 155,
            "name"=> "MORATA",
            "model_id"=> 43094,
            "position"=> "CF"
            ],
            [
            "id"=> 156,
            "name"=> "F. ACERBI",
            "model_id"=> 44676,
            "position"=> "CB"
            ],
            [
            "id"=> 157,
            "name"=> "ALLAN",
            "model_id"=> 45641,
            "position"=> "CMF"
            ],
            [
            "id"=> 158,
            "name"=> "J. DRAXLER",
            "model_id"=> 45946,
            "position"=> "AMF"
            ],
            [
            "id"=> 159,
            "name"=> "A. RABIOT",
            "model_id"=> 47051,
            "position"=> "CMF"
            ],
            [
            "id"=> 160,
            "name"=> "D. ZAPATA",
            "model_id"=> 60060,
            "position"=> "CF"
            ],
            [
            "id"=> 161,
            "name"=> "K. COMAN",
            "model_id"=> 60446,
            "position"=> "LWF"
            ],
            [
            "id"=> 162,
            "name"=> "S. GNABRY",
            "model_id"=> 60884,
            "position"=> "RWF"
            ],
            [
            "id"=> 163,
            "name"=> "J. BRANDT",
            "model_id"=> 60928,
            "position"=> "LWF"
            ],
            [
            "id"=> 164,
            "name"=> "M. GINTER",
            "model_id"=> 61681,
            "position"=> "CB"
            ],
            [
            "id"=> 165,
            "name"=> "TALISCA",
            "model_id"=> 63509,
            "position"=> "AMF"
            ],
            [
            "id"=> 166,
            "name"=> "F. BERNARDESCHI",
            "model_id"=> 100117,
            "position"=> "RWF"
            ],
            [
            "id"=> 167,
            "name"=> "A. BELOTTI",
            "model_id"=> 100607,
            "position"=> "CF"
            ],
            [
            "id"=> 168,
            "name"=> "T. LEMAR",
            "model_id"=> 100967,
            "position"=> "LWF"
            ],
            [
            "id"=> 169,
            "name"=> "T. PARTEY",
            "model_id"=> 101615,
            "position"=> "DMF"
            ],
            [
            "id"=> 170,
            "name"=> "D. SÁNCHEZ",
            "model_id"=> 104612,
            "position"=> "CB"
            ],
            [
            "id"=> 171,
            "name"=> "B. PAVARD",
            "model_id"=> 104752,
            "position"=> "CB"
            ],
            [
            "id"=> 172,
            "name"=> "D. ALLI",
            "model_id"=> 106593,
            "position"=> "AMF"
            ],
            [
            "id"=> 173,
            "name"=> "ARTHUR",
            "model_id"=> 106614,
            "position"=> "CMF"
            ],
            [
            "id"=> 174,
            "name"=> "N. PÉPÉ",
            "model_id"=> 107716,
            "position"=> "RWF"
            ],
            [
            "id"=> 175,
            "name"=> "L. TORREIRA",
            "model_id"=> 108129,
            "position"=> "DMF"
            ],
            [
            "id"=> 176,
            "name"=> "RICHARLISON",
            "model_id"=> 110866,
            "position"=> "LWF"
            ],
            [
            "id"=> 177,
            "name"=> "H. LOZANO",
            "model_id"=> 112334,
            "position"=> "LWF"
            ],
            [
            "id"=> 178,
            "name"=> "T. ALEXANDER-ARNOLD",
            "model_id"=> 113405,
            "position"=> "RB"
            ],
            [
            "id"=> 179,
            "name"=> "T. NDOMBÈLÉ",
            "model_id"=> 114053,
            "position"=> "CMF"
            ],
            [
            "id"=> 180,
            "name"=> "JOÃO FÉLIX",
            "model_id"=> 126336,
            "position"=> "SS"
            ],
            [
            "id"=> 181,
            "name"=> "S. ARIAS",
            "model_id"=> 44857,
            "position"=> "RB"
            ],
            [
            "id"=> 182,
            "name"=> "G. PEZZELLA",
            "model_id"=> 45071,
            "position"=> "CB"
            ],
            [
            "id"=> 183,
            "name"=> "L. DIGNE",
            "model_id"=> 45089,
            "position"=> "LB"
            ],
            [
            "id"=> 184,
            "name"=> "SUSO",
            "model_id"=> 45267,
            "position"=> "RWF"
            ],
            [
            "id"=> 185,
            "name"=> "L. PAREDES",
            "model_id"=> 45356,
            "position"=> "DMF"
            ],
            [
            "id"=> 186,
            "name"=> "F. ARMANI",
            "model_id"=> 45674,
            "position"=> "GK"
            ],
            [
            "id"=> 187,
            "name"=> "WILLIAN JOSÉ",
            "model_id"=> 45962,
            "position"=> "CF"
            ],
            [
            "id"=> 188,
            "name"=> "T. MEUNIER",
            "model_id"=> 46647,
            "position"=> "RB"
            ],
            [
            "id"=> 189,
            "name"=> "E. CAN",
            "model_id"=> 46825,
            "position"=> "CMF"
            ],
            [
            "id"=> 190,
            "name"=> "A. FLORENZI",
            "model_id"=> 47011,
            "position"=> "RB"
            ],
            [
            "id"=> 191,
            "name"=> "S. KOLAŠINAC",
            "model_id"=> 47162,
            "position"=> "LB"
            ],
            [
            "id"=> 192,
            "name"=> "A. MARTIAL",
            "model_id"=> 47711,
            "position"=> "LMF"
            ],
            [
            "id"=> 193,
            "name"=> "ALEX TELLES",
            "model_id"=> 47727,
            "position"=> "LB"
            ],
            [
            "id"=> 194,
            "name"=> "R. JIMÉNEZ",
            "model_id"=> 57330,
            "position"=> "CF"
            ],
            [
            "id"=> 195,
            "name"=> "THIAGO MENDES",
            "model_id"=> 58747,
            "position"=> "DMF"
            ],
            [
            "id"=> 196,
            "name"=> "R. BÜRKI",
            "model_id"=> 59490,
            "position"=> "GK"
            ],
            [
            "id"=> 197,
            "name"=> "W. ZAHA",
            "model_id"=> 59760,
            "position"=> "LWF"
            ],
            [
            "id"=> 198,
            "name"=> "B. MENDY",
            "model_id"=> 60443,
            "position"=> "LB"
            ],
            [
            "id"=> 199,
            "name"=> "M. MAIGNAN",
            "model_id"=> 60447,
            "position"=> "GK"
            ],
            [
            "id"=> 200,
            "name"=> "C. TOLISSO",
            "model_id"=> 60906,
            "position"=> "CMF"
            ],
            [
            "id"=> 201,
            "name"=> "EVERTON",
            "model_id"=> 61451,
            "position"=> "LWF"
            ],
            [
            "id"=> 202,
            "name"=> "G.DE ARRASCAETA",
            "model_id"=> 61525,
            "position"=> "AMF"
            ],
            [
            "id"=> 203,
            "name"=> "LUIS ALBERTO",
            "model_id"=> 63457,
            "position"=> "AMF"
            ],
            [
            "id"=> 204,
            "name"=> "J. VARDY",
            "model_id"=> 100159,
            "position"=> "CF"
            ],
            [
            "id"=> 205,
            "name"=> "HECTOR BELLERÍN",
            "model_id"=> 100510,
            "position"=> "RB"
            ],
            [
            "id"=> 206,
            "name"=> "M. POLITANO",
            "model_id"=> 100620,
            "position"=> "RWF"
            ],
            [
            "id"=> 207,
            "name"=> "N. KEÏTA",
            "model_id"=> 100871,
            "position"=> "CMF"
            ],
            [
            "id"=> 208,
            "name"=> "MALCOM",
            "model_id"=> 101120,
            "position"=> "RWF"
            ],
            [
            "id"=> 209,
            "name"=> "E. FORSBERG",
            "model_id"=> 101872,
            "position"=> "LWF"
            ],
            [
            "id"=> 210,
            "name"=> "D. RUGANI",
            "model_id"=> 102759,
            "position"=> "CB"
            ],
            [
            "id"=> 211,
            "name"=> "P. KIMPEMBE",
            "model_id"=> 103206,
            "position"=> "CB"
            ],
            [
            "id"=> 212,
            "name"=> "ASENSIO",
            "model_id"=> 103420,
            "position"=> "LMF"
            ],
            [
            "id"=> 213,
            "name"=> "RÚBEN NEVES",
            "model_id"=> 104204,
            "position"=> "DMF"
            ],
            [
            "id"=> 214,
            "name"=> "A. MERET",
            "model_id"=> 104485,
            "position"=> "GK"
            ],
            [
            "id"=> 215,
            "name"=> "A. RÜDIGER",
            "model_id"=> 104677,
            "position"=> "CB"
            ],
            [
            "id"=> 216,
            "name"=> "S. BERGWIJN",
            "model_id"=> 104735,
            "position"=> "LWF"
            ],
            [
            "id"=> 217,
            "name"=> "A. ONANA",
            "model_id"=> 104804,
            "position"=> "GK"
            ],
            [
            "id"=> 218,
            "name"=> "J. PAVLENKA",
            "model_id"=> 105061,
            "position"=> "GK"
            ],
            [
            "id"=> 219,
            "name"=> "C. PAVÓN",
            "model_id"=> 105633,
            "position"=> "RWF"
            ],
            [
            "id"=> 220,
            "name"=> "GONÇALO GUEDES",
            "model_id"=> 107674,
            "position"=> "LWF"
            ],
            [
            "id"=> 221,
            "name"=> "D. DAKONAM",
            "model_id"=> 107722,
            "position"=> "CB"
            ],
            [
            "id"=> 222,
            "name"=> "G. LO CELSO",
            "model_id"=> 108751,
            "position"=> "CMF"
            ],
            [
            "id"=> 223,
            "name"=> "V. LINDELÖF",
            "model_id"=> 109123,
            "position"=> "CB"
            ],
            [
            "id"=> 224,
            "name"=> "M. AKANJI",
            "model_id"=> 109124,
            "position"=> "CB"
            ],
            [
            "id"=> 225,
            "name"=> "M. RASHFORD",
            "model_id"=> 110638,
            "position"=> "CF"
            ],
            [
            "id"=> 226,
            "name"=> "A. GOLOVIN",
            "model_id"=> 112062,
            "position"=> "AMF"
            ],
            [
            "id"=> 227,
            "name"=> "J. TAH",
            "model_id"=> 112376,
            "position"=> "CB"
            ],
            [
            "id"=> 228,
            "name"=> "ÉDER MILITÃO",
            "model_id"=> 113525,
            "position"=> "CB"
            ],
            [
            "id"=> 229,
            "name"=> "F. CHIESA",
            "model_id"=> 114235,
            "position"=> "RWF"
            ],
            [
            "id"=> 230,
            "name"=> "DAVID NERES",
            "model_id"=> 114333,
            "position"=> "RWF"
            ],
            [
            "id"=> 231,
            "name"=> "HULK",
            "model_id"=> 1073756862,
            "position"=> "RWF"
            ],
            [
            "id"=> 232,
            "name"=> "PEPE REINA",
            "model_id"=> 2506,
            "position"=> "GK"
            ],
            [
            "id"=> 233,
            "name"=> "D. DE ROSSI",
            "model_id"=> 3603,
            "position"=> "DMF"
            ],
            [
            "id"=> 234,
            "name"=> "DANI ALVES",
            "model_id"=> 7312,
            "position"=> "RB"
            ],
            [
            "id"=> 235,
            "name"=> "PEPE",
            "model_id"=> 9133,
            "position"=> "CB"
            ],
            [
            "id"=> 236,
            "name"=> "FILIPE LUIS",
            "model_id"=> 9193,
            "position"=> "LB"
            ],
            [
            "id"=> 237,
            "name"=> "MIRANDA",
            "model_id"=> 32586,
            "position"=> "CB"
            ],
            [
            "id"=> 238,
            "name"=> "L. BIGLIA",
            "model_id"=> 34783,
            "position"=> "DMF"
            ],
            [
            "id"=> 239,
            "name"=> "NACHO MONREAL",
            "model_id"=> 35110,
            "position"=> "LB"
            ],
            [
            "id"=> 240,
            "name"=> "F. FAZIO",
            "model_id"=> 35123,
            "position"=> "CB"
            ],
            [
            "id"=> 241,
            "name"=> "T. HAZARD",
            "model_id"=> 63916,
            "position"=> "RWF"
            ],
            [
            "id"=> 242,
            "name"=> "A. IZZO",
            "model_id"=> 100429,
            "position"=> "CB"
            ],
            [
            "id"=> 243,
            "name"=> "MARLOS",
            "model_id"=> 102711,
            "position"=> "RWF"
            ],
            [
            "id"=> 244,
            "name"=> "J. GOMEZ",
            "model_id"=> 104337,
            "position"=> "CB"
            ],
            [
            "id"=> 245,
            "name"=> "R. BENTANCUR",
            "model_id"=> 105297,
            "position"=> "CMF"
            ],
            [
            "id"=> 246,
            "name"=> "D. CALIGIURI",
            "model_id"=> 106787,
            "position"=> "RMF"
            ],
            [
            "id"=> 247,
            "name"=> "F. MENDY",
            "model_id"=> 107889,
            "position"=> "LB"
            ],
            [
            "id"=> 248,
            "name"=> "D. VAN DE BEEK",
            "model_id"=> 107941,
            "position"=> "AMF"
            ],
            [
            "id"=> 249,
            "name"=> "FABIÁN RUIZ",
            "model_id"=> 108239,
            "position"=> "CMF"
            ],
            [
            "id"=> 250,
            "name"=> "L. MARTÍNEZ",
            "model_id"=> 108657,
            "position"=> "CF"
            ],
            [
            "id"=> 251,
            "name"=> "NÉLSON SEMEDO",
            "model_id"=> 108696,
            "position"=> "RB"
            ],
            [
            "id"=> 252,
            "name"=> "RÚBEN DIAS",
            "model_id"=> 111800,
            "position"=> "CB"
            ],
            [
            "id"=> 253,
            "name"=> "D. DUMFRIES",
            "model_id"=> 111986,
            "position"=> "RB"
            ],
            [
            "id"=> 254,
            "name"=> "T. KEHRER",
            "model_id"=> 113284,
            "position"=> "CB"
            ],
            [
            "id"=> 255,
            "name"=> "K. HAVERTZ",
            "model_id"=> 114506,
            "position"=> "AMF"
            ],
            [
            "id"=> 256,
            "name"=> "W. NDIDI",
            "model_id"=> 114961,
            "position"=> "DMF"
            ],
            [
            "id"=> 257,
            "name"=> "L. BAILEY",
            "model_id"=> 115118,
            "position"=> "LWF"
            ],
            [
            "id"=> 258,
            "name"=> "W. ORBAN",
            "model_id"=> 116649,
            "position"=> "CB"
            ],
            [
            "id"=> 259,
            "name"=> "J. SANCHO",
            "model_id"=> 118007,
            "position"=> "RWF"
            ],
            [
            "id"=> 260,
            "name"=> "K. DEMIRBAY",
            "model_id"=> 132147,
            "position"=> "CMF"
            ],
            [
            "id"=> 261,
            "name"=> "S. GIOVINCO",
            "model_id"=> 1073778995,
            "position"=> "SS"
            ],
            [
            "id"=> 262,
            "name"=> "GIULIANO",
            "model_id"=> 1073843351,
            "position"=> "AMF"
            ],
            [
            "id"=> 263,
            "name"=> "R. QUARESMA",
            "model_id"=> 4526,
            "position"=> "RWF"
            ],
            [
            "id"=> 264,
            "name"=> "J. FARFÁN",
            "model_id"=> 5106,
            "position"=> "RWF"
            ],
            [
            "id"=> 265,
            "name"=> "R. BABEL",
            "model_id"=> 6259,
            "position"=> "LWF"
            ],
            [
            "id"=> 266,
            "name"=> "M. FERNANDES",
            "model_id"=> 6330,
            "position"=> "CMF"
            ],
            [
            "id"=> 267,
            "name"=> "B. COSTIL",
            "model_id"=> 8662,
            "position"=> "GK"
            ],
            [
            "id"=> 268,
            "name"=> "L. PERRIN",
            "model_id"=> 8701,
            "position"=> "CB"
            ],
            [
            "id"=> 269,
            "name"=> "P. GUERRERO",
            "model_id"=> 8823,
            "position"=> "CF"
            ],
            [
            "id"=> 270,
            "name"=> "H. SAKAI",
            "model_id"=> 15808,
            "position"=> "RB"
            ],
            [
            "id"=> 271,
            "name"=> "OXLADE-CHAMBERLAIN",
            "model_id"=> 45126,
            "position"=> "CMF"
            ],
            [
            "id"=> 272,
            "name"=> "S. HALLER",
            "model_id"=> 45176,
            "position"=> "CF"
            ],
            [
            "id"=> 273,
            "name"=> "T. VACLÍK",
            "model_id"=> 45383,
            "position"=> "GK"
            ],
            [
            "id"=> 274,
            "name"=> "J. QUINTERO",
            "model_id"=> 45685,
            "position"=> "AMF"
            ],
            [
            "id"=> 275,
            "name"=> "ÉVERTON RIBEIRO",
            "model_id"=> 46373,
            "position"=> "RMF"
            ],
            [
            "id"=> 276,
            "name"=> "W. KHAZRI",
            "model_id"=> 46481,
            "position"=> "AMF"
            ],
            [
            "id"=> 277,
            "name"=> "D. SIDIBÉ",
            "model_id"=> 46498,
            "position"=> "RB"
            ],
            [
            "id"=> 278,
            "name"=> "RICARDO PEREIRA",
            "model_id"=> 46819,
            "position"=> "RB"
            ],
            [
            "id"=> 279,
            "name"=> "PACO ALCÁCER",
            "model_id"=> 46828,
            "position"=> "CF"
            ],
            [
            "id"=> 280,
            "name"=> "ANDRÉ GOMES",
            "model_id"=> 47433,
            "position"=> "CMF"
            ],
            [
            "id"=> 281,
            "name"=> "A. DOUCOURÉ",
            "model_id"=> 47533,
            "position"=> "CMF"
            ],
            [
            "id"=> 282,
            "name"=> "W. BARRIOS",
            "model_id"=> 47784,
            "position"=> "DMF"
            ],
            [
            "id"=> 283,
            "name"=> "L. KURZAWA",
            "model_id"=> 57207,
            "position"=> "LB"
            ],
            [
            "id"=> 284,
            "name"=> "Y. CARRASCO",
            "model_id"=> 57213,
            "position"=> "LMF"
            ],
            [
            "id"=> 285,
            "name"=> "A. MILIK",
            "model_id"=> 58653,
            "position"=> "CF"
            ],
            [
            "id"=> 286,
            "name"=> "GABRIEL BARBOSA",
            "model_id"=> 58759,
            "position"=> "CF"
            ],
            [
            "id"=> 287,
            "name"=> "R. GUERREIRO",
            "model_id"=> 59835,
            "position"=> "LMF"
            ],
            [
            "id"=> 288,
            "name"=> "M. SANSON",
            "model_id"=> 59842,
            "position"=> "CMF"
            ],
            [
            "id"=> 289,
            "name"=> "G. RULLI",
            "model_id"=> 60059,
            "position"=> "GK"
            ],
            [
            "id"=> 290,
            "name"=> "W. BENÍTEZ",
            "model_id"=> 60109,
            "position"=> "GK"
            ],
            [
            "id"=> 291,
            "name"=> "Á. CORREA",
            "model_id"=> 60168,
            "position"=> "RWF"
            ],
            [
            "id"=> 292,
            "name"=> "R. DE PAUL",
            "model_id"=> 60241,
            "position"=> "LWF"
            ],
            [
            "id"=> 293,
            "name"=> "RAFA SILVA",
            "model_id"=> 60391,
            "position"=> "LWF"
            ],
            [
            "id"=> 294,
            "name"=> "A.SAINT-MAXIMIN",
            "model_id"=> 60550,
            "position"=> "RWF"
            ],
            [
            "id"=> 295,
            "name"=> "T. BAKAYOKO",
            "model_id"=> 60620,
            "position"=> "DMF"
            ],
            [
            "id"=> 296,
            "name"=> "WILLIAM",
            "model_id"=> 60627,
            "position"=> "DMF"
            ],
            [
            "id"=> 297,
            "name"=> "T. STRAKOSHA",
            "model_id"=> 61089,
            "position"=> "GK"
            ],
            [
            "id"=> 298,
            "name"=> "PAU LÓPEZ",
            "model_id"=> 61147,
            "position"=> "GK"
            ],
            [
            "id"=> 299,
            "name"=> "J. LINGARD",
            "model_id"=> 61181,
            "position"=> "RMF"
            ],
            [
            "id"=> 300,
            "name"=> "K. VOLLAND",
            "model_id"=> 61683,
            "position"=> "CF"
            ],
            [
            "id"=> 301,
            "name"=> "R. JARSTEIN",
            "model_id"=> 32844,
            "position"=> "GK"
            ],
            [
            "id"=> 302,
            "name"=> "E. GARAY",
            "model_id"=> 33944,
            "position"=> "CB"
            ],
            [
            "id"=> 303,
            "name"=> "A. GUARDADO",
            "model_id"=> 34108,
            "position"=> "CMF"
            ],
            [
            "id"=> 304,
            "name"=> "JOSÉ FONTE",
            "model_id"=> 34799,
            "position"=> "CB"
            ],
            [
            "id"=> 305,
            "name"=> "B. YILMAZ",
            "model_id"=> 34862,
            "position"=> "CF"
            ],
            [
            "id"=> 306,
            "name"=> "A. DZYUBA",
            "model_id"=> 36256,
            "position"=> "CF"
            ],
            [
            "id"=> 307,
            "name"=> "Y. GERVINHO",
            "model_id"=> 36986,
            "position"=> "LWF"
            ],
            [
            "id"=> 308,
            "name"=> "D. ROSE",
            "model_id"=> 37201,
            "position"=> "LB"
            ],
            [
            "id"=> 309,
            "name"=> "Y. M'VILA",
            "model_id"=> 37403,
            "position"=> "DMF"
            ],
            [
            "id"=> 310,
            "name"=> "S. KJÆR",
            "model_id"=> 38054,
            "position"=> "CB"
            ],
            [
            "id"=> 311,
            "name"=> "N. N'KOULOU",
            "model_id"=> 38181,
            "position"=> "CB"
            ],
            [
            "id"=> 312,
            "name"=> "S. FEGHOULI",
            "model_id"=> 38211,
            "position"=> "RWF"
            ],
            [
            "id"=> 313,
            "name"=> "D. LOVREN",
            "model_id"=> 38346,
            "position"=> "CB"
            ],
            [
            "id"=> 314,
            "name"=> "CANALES",
            "model_id"=> 38655,
            "position"=> "AMF"
            ],
            [
            "id"=> 315,
            "name"=> "T. DELANEY",
            "model_id"=> 40150,
            "position"=> "CMF"
            ],
            [
            "id"=> 316,
            "name"=> "L. SIGALI",
            "model_id"=> 40176,
            "position"=> "CB"
            ],
            [
            "id"=> 317,
            "name"=> "M. PAROLO",
            "model_id"=> 40248,
            "position"=> "CMF"
            ],
            [
            "id"=> 318,
            "name"=> "D. PEROTTI",
            "model_id"=> 40423,
            "position"=> "LWF"
            ],
            [
            "id"=> 319,
            "name"=> "Y. BELHANDA",
            "model_id"=> 40632,
            "position"=> "AMF"
            ],
            [
            "id"=> 320,
            "name"=> "Y. RAKITSKIY",
            "model_id"=> 40838,
            "position"=> "CB"
            ],
            [
            "id"=> 321,
            "name"=> "Š. VRSALJKO",
            "model_id"=> 40856,
            "position"=> "RB"
            ],
            [
            "id"=> 322,
            "name"=> "R. PEREYRA",
            "model_id"=> 40919,
            "position"=> "LMF"
            ],
            [
            "id"=> 323,
            "name"=> "E. PÉREZ",
            "model_id"=> 41163,
            "position"=> "CMF"
            ],
            [
            "id"=> 324,
            "name"=> "M. DÍAZ",
            "model_id"=> 41428,
            "position"=> "DMF"
            ],
            [
            "id"=> 325,
            "name"=> "B. HÖWEDES",
            "model_id"=> 41605,
            "position"=> "CB"
            ],
            [
            "id"=> 326,
            "name"=> "RODRIGO",
            "model_id"=> 42538,
            "position"=> "CF"
            ],
            [
            "id"=> 327,
            "name"=> "J. CORONA",
            "model_id"=> 42721,
            "position"=> "RWF"
            ],
            [
            "id"=> 328,
            "name"=> "C. BAKAMBU",
            "model_id"=> 42806,
            "position"=> "CF"
            ],
            [
            "id"=> 329,
            "name"=> "BARTRA",
            "model_id"=> 42868,
            "position"=> "CB"
            ],
            [
            "id"=> 330,
            "name"=> "DANILO PEREIRA",
            "model_id"=> 43015,
            "position"=> "DMF"
            ],
            [
            "id"=> 331,
            "name"=> "É. BANEGA",
            "model_id"=> 35250,
            "position"=> "AMF"
            ],
            [
            "id"=> 332,
            "name"=> "M. ZÁRATE",
            "model_id"=> 35882,
            "position"=> "SS"
            ],
            [
            "id"=> 333,
            "name"=> "D. OSPINA",
            "model_id"=> 36703,
            "position"=> "GK"
            ],
            [
            "id"=> 334,
            "name"=> "MATA",
            "model_id"=> 36766,
            "position"=> "RMF"
            ],
            [
            "id"=> 335,
            "name"=> "CÁSSIO",
            "model_id"=> 36943,
            "position"=> "GK"
            ],
            [
            "id"=> 336,
            "name"=> "S. MANDANDA",
            "model_id"=> 37026,
            "position"=> "GK"
            ],
            [
            "id"=> 337,
            "name"=> "M. BALOTELLI",
            "model_id"=> 37306,
            "position"=> "CF"
            ],
            [
            "id"=> 338,
            "name"=> "TAISON",
            "model_id"=> 38295,
            "position"=> "LWF"
            ],
            [
            "id"=> 339,
            "name"=> "G. BONAVENTURA",
            "model_id"=> 38366,
            "position"=> "CMF"
            ],
            [
            "id"=> 340,
            "name"=> "L. DE JONG",
            "model_id"=> 38491,
            "position"=> "CF"
            ],
            [
            "id"=> 341,
            "name"=> "K. STROOTMAN",
            "model_id"=> 38499,
            "position"=> "CMF"
            ],
            [
            "id"=> 342,
            "name"=> "J. CILLESSEN",
            "model_id"=> 38635,
            "position"=> "GK"
            ],
            [
            "id"=> 343,
            "name"=> "D. BLIND",
            "model_id"=> 38797,
            "position"=> "CB"
            ],
            [
            "id"=> 344,
            "name"=> "H. MKHITARYAN",
            "model_id"=> 39936,
            "position"=> "RMF"
            ],
            [
            "id"=> 345,
            "name"=> "S. KHEDIRA",
            "model_id"=> 40347,
            "position"=> "CMF"
            ],
            [
            "id"=> 346,
            "name"=> "ANDER HERRERA",
            "model_id"=> 40456,
            "position"=> "CMF"
            ],
            [
            "id"=> 347,
            "name"=> "ADÁN",
            "model_id"=> 40669,
            "position"=> "GK"
            ],
            [
            "id"=> 348,
            "name"=> "R. CABELLA",
            "model_id"=> 41000,
            "position"=> "AMF"
            ],
            [
            "id"=> 349,
            "name"=> "OSCAR",
            "model_id"=> 41232,
            "position"=> "AMF"
            ],
            [
            "id"=> 350,
            "name"=> "PIZZI",
            "model_id"=> 42348,
            "position"=> "RMF"
            ],
            [
            "id"=> 351,
            "name"=> "B. LECOMTE",
            "model_id"=> 42821,
            "position"=> "GK"
            ],
            [
            "id"=> 352,
            "name"=> "ILLARRAMENDI",
            "model_id"=> 42865,
            "position"=> "DMF"
            ],
            [
            "id"=> 353,
            "name"=> "NACHO",
            "model_id"=> 42874,
            "position"=> "CB"
            ],
            [
            "id"=> 354,
            "name"=> "S. SANÉ",
            "model_id"=> 43074,
            "position"=> "CB"
            ],
            [
            "id"=> 355,
            "name"=> "G. KONDOGBIA",
            "model_id"=> 43075,
            "position"=> "CMF"
            ],
            [
            "id"=> 356,
            "name"=> "LUIZ GUSTAVO",
            "model_id"=> 43133,
            "position"=> "DMF"
            ],
            [
            "id"=> 357,
            "name"=> "MARCOS ALONSO",
            "model_id"=> 43157,
            "position"=> "LB"
            ],
            [
            "id"=> 358,
            "name"=> "NETO",
            "model_id"=> 43202,
            "position"=> "GK"
            ],
            [
            "id"=> 359,
            "name"=> "L. HRADECKY",
            "model_id"=> 43415,
            "position"=> "GK"
            ],
            [
            "id"=> 360,
            "name"=> "M. FERNANDES",
            "model_id"=> 43784,
            "position"=> "RB"
            ],
            [
            "id"=> 361,
            "name"=> "M. BATSHUAYI",
            "model_id"=> 44401,
            "position"=> "CF"
            ],
            [
            "id"=> 362,
            "name"=> "C. IMMOBILE",
            "model_id"=> 41066,
            "position"=> "CF"
            ],
            [
            "id"=> 363,
            "name"=> "KOKE",
            "model_id"=> 41082,
            "position"=> "CMF"
            ],
            [
            "id"=> 364,
            "name"=> "D. ALABA",
            "model_id"=> 41124,
            "position"=> "LB"
            ],
            [
            "id"=> 365,
            "name"=> "J. RODRÍGUEZ",
            "model_id"=> 41581,
            "position"=> "AMF"
            ],
            [
            "id"=> 366,
            "name"=> "ISCO",
            "model_id"=> 42556,
            "position"=> "AMF"
            ],
            [
            "id"=> 367,
            "name"=> "CASEMIRO",
            "model_id"=> 42669,
            "position"=> "DMF"
            ],
            [
            "id"=> 368,
            "name"=> "SON HEUNG-MIN",
            "model_id"=> 43063,
            "position"=> "LWF"
            ],
            [
            "id"=> 369,
            "name"=> "B. LENO",
            "model_id"=> 45144,
            "position"=> "GK"
            ],
            [
            "id"=> 370,
            "name"=> "S. UMTITI",
            "model_id"=> 45330,
            "position"=> "CB"
            ],
            [
            "id"=> 371,
            "name"=> "MARQUINHOS",
            "model_id"=> 45993,
            "position"=> "CB"
            ],
            [
            "id"=> 372,
            "name"=> "L. INSIGNE",
            "model_id"=> 46235,
            "position"=> "LWF"
            ],
            [
            "id"=> 373,
            "name"=> "M. ICARDI",
            "model_id"=> 46637,
            "position"=> "CF"
            ],
            [
            "id"=> 374,
            "name"=> "KEPA",
            "model_id"=> 47242,
            "position"=> "GK"
            ],
            [
            "id"=> 375,
            "name"=> "A. LAPORTE",
            "model_id"=> 47522,
            "position"=> "CB"
            ],
            [
            "id"=> 376,
            "name"=> "L. SANÉ",
            "model_id"=> 102901,
            "position"=> "LWF"
            ],
            [
            "id"=> 377,
            "name"=> "H. MAGUIRE",
            "model_id"=> 109329,
            "position"=> "CB"
            ],
            [
            "id"=> 378,
            "name"=> "O. DEMBÉLÉ",
            "model_id"=> 110626,
            "position"=> "LWF"
            ],
            [
            "id"=> 379,
            "name"=> "M. DE LIGT",
            "model_id"=> 114105,
            "position"=> "CB"
            ],
            [
            "id"=> 380,
            "name"=> "B. MATUIDI",
            "model_id"=> 32159,
            "position"=> "CMF"
            ],
            [
            "id"=> 381,
            "name"=> "L. BONUCCI",
            "model_id"=> 33079,
            "position"=> "CB"
            ],
            [
            "id"=> 382,
            "name"=> "JAVI MARTÍNEZ",
            "model_id"=> 35108,
            "position"=> "DMF"
            ],
            [
            "id"=> 383,
            "name"=> "DAVID LUIZ",
            "model_id"=> 35207,
            "position"=> "CB"
            ],
            [
            "id"=> 384,
            "name"=> "AZPILICUETA",
            "model_id"=> 35876,
            "position"=> "RB"
            ],
            [
            "id"=> 385,
            "name"=> "SOKRATIS",
            "model_id"=> 36358,
            "position"=> "CB"
            ],
            [
            "id"=> 386,
            "name"=> "A. SÁNCHEZ",
            "model_id"=> 36718,
            "position"=> "LWF"
            ],
            [
            "id"=> 387,
            "name"=> "DIEGO COSTA",
            "model_id"=> 36877,
            "position"=> "CF"
            ],
            [
            "id"=> 388,
            "name"=> "A. WITSEL",
            "model_id"=> 37827,
            "position"=> "DMF"
            ],
            [
            "id"=> 389,
            "name"=> "A. RAMSEY",
            "model_id"=> 38082,
            "position"=> "CMF"
            ],
            [
            "id"=> 390,
            "name"=> "M. ÖZIL",
            "model_id"=> 38240,
            "position"=> "AMF"
            ],
            [
            "id"=> 391,
            "name"=> "WILLIAN",
            "model_id"=> 38297,
            "position"=> "RWF"
            ],
            [
            "id"=> 392,
            "name"=> "F. GHOULAM",
            "model_id"=> 43079,
            "position"=> "LB"
            ],
            [
            "id"=> 393,
            "name"=> "R. RODRÍGUEZ",
            "model_id"=> 43467,
            "position"=> "LB"
            ],
            [
            "id"=> 394,
            "name"=> "ISMAILY",
            "model_id"=> 44105,
            "position"=> "LB"
            ],
            [
            "id"=> 395,
            "name"=> "V. WANYAMA",
            "model_id"=> 44682,
            "position"=> "DMF"
            ],
            [
            "id"=> 396,
            "name"=> "S. MUSTAFI",
            "model_id"=> 44685,
            "position"=> "CB"
            ],
            [
            "id"=> 397,
            "name"=> "JUAN BERNAT",
            "model_id"=> 44946,
            "position"=> "LB"
            ],
            [
            "id"=> 398,
            "name"=> "S. KVERKVELIA",
            "model_id"=> 45012,
            "position"=> "CB"
            ],
            [
            "id"=> 399,
            "name"=> "DEDÉ",
            "model_id"=> 45640,
            "position"=> "CB"
            ],
            [
            "id"=> 400,
            "name"=> "FELIPE",
            "model_id"=> 46240,
            "position"=> "CB"
            ],
            [
            "id"=> 401,
            "name"=> "RAFINHA",
            "model_id"=> 47244,
            "position"=> "AMF"
            ],
            [
            "id"=> 402,
            "name"=> "E. DIER",
            "model_id"=> 47431,
            "position"=> "DMF"
            ],
            [
            "id"=> 403,
            "name"=> "D. BENEDETTO",
            "model_id"=> 47814,
            "position"=> "CF"
            ],
            [
            "id"=> 404,
            "name"=> "G. PEREIRO",
            "model_id"=> 47909,
            "position"=> "AMF"
            ],
            [
            "id"=> 405,
            "name"=> "J. VERETOUT",
            "model_id"=> 57258,
            "position"=> "CMF"
            ],
            [
            "id"=> 406,
            "name"=> "GERARD MORENO",
            "model_id"=> 57349,
            "position"=> "CF"
            ],
            [
            "id"=> 407,
            "name"=> "FRED",
            "model_id"=> 57433,
            "position"=> "CMF"
            ],
            [
            "id"=> 408,
            "name"=> "MORALES",
            "model_id"=> 58840,
            "position"=> "LWF"
            ],
            [
            "id"=> 409,
            "name"=> "VITOLO",
            "model_id"=> 59509,
            "position"=> "LWF"
            ],
            [
            "id"=> 410,
            "name"=> "N. AKÉ",
            "model_id"=> 59766,
            "position"=> "CB"
            ],
            [
            "id"=> 411,
            "name"=> "J. MARTÍNEZ",
            "model_id"=> 59964,
            "position"=> "CF"
            ],
            [
            "id"=> 412,
            "name"=> "H. HERRERA",
            "model_id"=> 59995,
            "position"=> "CMF"
            ],
            [
            "id"=> 413,
            "name"=> "J. CORREA",
            "model_id"=> 60068,
            "position"=> "SS"
            ],
            [
            "id"=> 414,
            "name"=> "L. ALARIO",
            "model_id"=> 60143,
            "position"=> "CF"
            ],
            [
            "id"=> 415,
            "name"=> "W. KANNEMANN",
            "model_id"=> 60159,
            "position"=> "CB"
            ],
            [
            "id"=> 416,
            "name"=> "J. MUSSO",
            "model_id"=> 60238,
            "position"=> "GK"
            ],
            [
            "id"=> 417,
            "name"=> "I. FERNÁNDEZ",
            "model_id"=> 60299,
            "position"=> "CMF"
            ],
            [
            "id"=> 418,
            "name"=> "K. BALDÉ",
            "model_id"=> 60563,
            "position"=> "RWF"
            ],
            [
            "id"=> 419,
            "name"=> "GAYÁ",
            "model_id"=> 61058,
            "position"=> "LB"
            ],
            [
            "id"=> 420,
            "name"=> "A. DIALLO",
            "model_id"=> 61142,
            "position"=> "CB"
            ],
            [
            "id"=> 421,
            "name"=> "L. PELLEGRINI",
            "model_id"=> 108096,
            "position"=> "CMF"
            ],
            [
            "id"=> 422,
            "name"=> "N. ELVEDI",
            "model_id"=> 109126,
            "position"=> "CB"
            ],
            [
            "id"=> 423,
            "name"=> "M. GÓMEZ",
            "model_id"=> 109846,
            "position"=> "CF"
            ],
            [
            "id"=> 424,
            "name"=> "N. SCHULZ",
            "model_id"=> 109915,
            "position"=> "LB"
            ],
            [
            "id"=> 425,
            "name"=> "HERMOSO",
            "model_id"=> 109997,
            "position"=> "CB"
            ],
            [
            "id"=> 426,
            "name"=> "PABLO FORNALS",
            "model_id"=> 110439,
            "position"=> "AMF"
            ],
            [
            "id"=> 427,
            "name"=> "MIKEL OYARZABAL",
            "model_id"=> 110596,
            "position"=> "LWF"
            ],
            [
            "id"=> 428,
            "name"=> "LUCAS PAQUETÁ",
            "model_id"=> 111804,
            "position"=> "AMF"
            ],
            [
            "id"=> 429,
            "name"=> "ODRIOZOLA",
            "model_id"=> 112940,
            "position"=> "RB"
            ],
            [
            "id"=> 430,
            "name"=> "F. CHALOV",
            "model_id"=> 113236,
            "position"=> "CF"
            ],
            [
            "id"=> 431,
            "name"=> "H. VANAKEN",
            "model_id"=> 113244,
            "position"=> "CMF"
            ],
            [
            "id"=> 432,
            "name"=> "WESLEY",
            "model_id"=> 113247,
            "position"=> "CF"
            ],
            [
            "id"=> 433,
            "name"=> "H. AOUAR",
            "model_id"=> 114064,
            "position"=> "CMF"
            ],
            [
            "id"=> 434,
            "name"=> "S. LOBOTKA",
            "model_id"=> 116254,
            "position"=> "DMF"
            ],
            [
            "id"=> 435,
            "name"=> "G. DZHIKIYA",
            "model_id"=> 116365,
            "position"=> "CB"
            ],
            [
            "id"=> 436,
            "name"=> "M. HALSTENBERG",
            "model_id"=> 116651,
            "position"=> "LB"
            ],
            [
            "id"=> 437,
            "name"=> "VINÍCIUS JÚNIOR",
            "model_id"=> 117047,
            "position"=> "LWF"
            ],
            [
            "id"=> 438,
            "name"=> "Y. ATAL",
            "model_id"=> 119499,
            "position"=> "RB"
            ],
            [
            "id"=> 439,
            "name"=> "M. EGGESTEIN",
            "model_id"=> 130379,
            "position"=> "CMF"
            ],
            [
            "id"=> 440,
            "name"=> "GABI",
            "model_id"=> 1073749127,
            "position"=> "CMF"
            ],
            [
            "id"=> 441,
            "name"=> "OSCAR",
            "model_id"=> 1073783056,
            "position"=> "AMF"
            ],
            [
            "id"=> 442,
            "name"=> "C. BAKAMBU",
            "model_id"=> 1073784630,
            "position"=> "CF"
            ],
            [
            "id"=> 443,
            "name"=> "C. TEVEZ",
            "model_id"=> 3712,
            "position"=> "SS"
            ],
            [
            "id"=> 444,
            "name"=> "JOAQUÍN",
            "model_id"=> 3741,
            "position"=> "RWF"
            ],
            [
            "id"=> 445,
            "name"=> "FÁBIO",
            "model_id"=> 4039,
            "position"=> "GK"
            ],
            [
            "id"=> 446,
            "name"=> "I. AKINFEEV",
            "model_id"=> 5778,
            "position"=> "GK"
            ],
            [
            "id"=> 447,
            "name"=> "T. VERMAELEN",
            "model_id"=> 6263,
            "position"=> "CB"
            ],
            [
            "id"=> 448,
            "name"=> "NAVAS",
            "model_id"=> 7327,
            "position"=> "RMF"
            ],
            [
            "id"=> 449,
            "name"=> "L. PONZIO",
            "model_id"=> 7435,
            "position"=> "DMF"
            ],
            [
            "id"=> 450,
            "name"=> "DANTE",
            "model_id"=> 7814,
            "position"=> "CB"
            ],
            [
            "id"=> 451,
            "name"=> "J. MATHIEU",
            "model_id"=> 7817,
            "position"=> "CB"
            ],
            [
            "id"=> 452,
            "name"=> "M. DEBUCHY",
            "model_id"=> 7880,
            "position"=> "RB"
            ],
            [
            "id"=> 453,
            "name"=> "FÀBREGAS",
            "model_id"=> 7959,
            "position"=> "CMF"
            ],
            [
            "id"=> 454,
            "name"=> "S. NAKAJIMA",
            "model_id"=> 16851,
            "position"=> "LWF"
            ],
            [
            "id"=> 455,
            "name"=> "K. GAMEIRO",
            "model_id"=> 30323,
            "position"=> "CF"
            ],
            [
            "id"=> 456,
            "name"=> "Y. CABAYE",
            "model_id"=> 30447,
            "position"=> "CMF"
            ],
            [
            "id"=> 457,
            "name"=> "L. SCHÖNE",
            "model_id"=> 32618,
            "position"=> "CMF"
            ],
            [
            "id"=> 458,
            "name"=> "A. PYATOV",
            "model_id"=> 34431,
            "position"=> "GK"
            ],
            [
            "id"=> 459,
            "name"=> "R. VORMER",
            "model_id"=> 34876,
            "position"=> "CMF"
            ],
            [
            "id"=> 460,
            "name"=> "ADRIEN SILVA",
            "model_id"=> 36788,
            "position"=> "CMF"
            ],
            [
            "id"=> 461,
            "name"=> "DIEGO ALVES",
            "model_id"=> 36918,
            "position"=> "GK"
            ],
            [
            "id"=> 462,
            "name"=> "FÁGNER",
            "model_id"=> 36945,
            "position"=> "RB"
            ],
            [
            "id"=> 463,
            "name"=> "LJ. FEJSA",
            "model_id"=> 37052,
            "position"=> "DMF"
            ],
            [
            "id"=> 464,
            "name"=> "M. MUSACCHIO",
            "model_id"=> 37114,
            "position"=> "CB"
            ],
            [
            "id"=> 465,
            "name"=> "IBORRA",
            "model_id"=> 37383,
            "position"=> "CMF"
            ],
            [
            "id"=> 466,
            "name"=> "ASENJO",
            "model_id"=> 37388,
            "position"=> "GK"
            ],
            [
            "id"=> 467,
            "name"=> "K. ASAMOAH",
            "model_id"=> 37536,
            "position"=> "LB"
            ],
            [
            "id"=> 468,
            "name"=> "A. YARMOLENKO",
            "model_id"=> 38261,
            "position"=> "RMF"
            ],
            [
            "id"=> 469,
            "name"=> "RENATO AUGUSTO",
            "model_id"=> 39215,
            "position"=> "CMF"
            ],
            [
            "id"=> 470,
            "name"=> "V. MOSES",
            "model_id"=> 39216,
            "position"=> "RMF"
            ],
            [
            "id"=> 471,
            "name"=> "C. ANSALDI",
            "model_id"=> 39359,
            "position"=> "LB"
            ],
            [
            "id"=> 472,
            "name"=> "MARCELO",
            "model_id"=> 39387,
            "position"=> "CB"
            ],
            [
            "id"=> 473,
            "name"=> "G. MEDEL",
            "model_id"=> 39699,
            "position"=> "DMF"
            ],
            [
            "id"=> 474,
            "name"=> "J. PASTORE",
            "model_id"=> 40220,
            "position"=> "AMF"
            ],
            [
            "id"=> 475,
            "name"=> "S. NZONZI",
            "model_id"=> 40278,
            "position"=> "DMF"
            ],
            [
            "id"=> 476,
            "name"=> "L. PRATTO",
            "model_id"=> 40661,
            "position"=> "CF"
            ],
            [
            "id"=> 477,
            "name"=> "E. LAMELA",
            "model_id"=> 40716,
            "position"=> "RWF"
            ],
            [
            "id"=> 478,
            "name"=> "ALEX TEIXEIRA",
            "model_id"=> 40925,
            "position"=> "CF"
            ],
            [
            "id"=> 479,
            "name"=> "E. SALVIO",
            "model_id"=> 41083,
            "position"=> "RWF"
            ],
            [
            "id"=> 480,
            "name"=> "S. COATES",
            "model_id"=> 41153,
            "position"=> "CB"
            ],
            [
            "id"=> 481,
            "name"=> "C. ARÁNGUIZ",
            "model_id"=> 41451,
            "position"=> "CMF"
            ],
            [
            "id"=> 482,
            "name"=> "S. AZMOUN",
            "model_id"=> 61702,
            "position"=> "CF"
            ],
            [
            "id"=> 483,
            "name"=> "Q. PROMES",
            "model_id"=> 63489,
            "position"=> "LWF"
            ],
            [
            "id"=> 484,
            "name"=> "DIEGO",
            "model_id"=> 63730,
            "position"=> "AMF"
            ],
            [
            "id"=> 485,
            "name"=> "M. KRUSE",
            "model_id"=> 63761,
            "position"=> "SS"
            ],
            [
            "id"=> 486,
            "name"=> "S. BENDER",
            "model_id"=> 63763,
            "position"=> "CB"
            ],
            [
            "id"=> 487,
            "name"=> "K. TRIPPIER",
            "model_id"=> 100299,
            "position"=> "RB"
            ],
            [
            "id"=> 488,
            "name"=> "GABRIEL PIRES",
            "model_id"=> 100393,
            "position"=> "CMF"
            ],
            [
            "id"=> 489,
            "name"=> "L. SPINAZZOLA",
            "model_id"=> 100630,
            "position"=> "LB"
            ],
            [
            "id"=> 490,
            "name"=> "RONY LOPES",
            "model_id"=> 100997,
            "position"=> "RMF"
            ],
            [
            "id"=> 491,
            "name"=> "M. DEMBÉLÉ",
            "model_id"=> 101038,
            "position"=> "CF"
            ],
            [
            "id"=> 492,
            "name"=> "ÁLEX GRIMALDO",
            "model_id"=> 101058,
            "position"=> "LB"
            ],
            [
            "id"=> 493,
            "name"=> "WILLIAMS",
            "model_id"=> 102290,
            "position"=> "RWF"
            ],
            [
            "id"=> 494,
            "name"=> "A. CRAGNO",
            "model_id"=> 102299,
            "position"=> "GK"
            ],
            [
            "id"=> 495,
            "name"=> "M. SABITZER",
            "model_id"=> 102526,
            "position"=> "RWF"
            ],
            [
            "id"=> 496,
            "name"=> "SAMU CASTILLEJO",
            "model_id"=> 102623,
            "position"=> "RWF"
            ],
            [
            "id"=> 497,
            "name"=> "C. WILSON",
            "model_id"=> 102692,
            "position"=> "CF"
            ],
            [
            "id"=> 498,
            "name"=> "DIEGO CARLOS",
            "model_id"=> 103268,
            "position"=> "CB"
            ],
            [
            "id"=> 499,
            "name"=> "J. DENAYER",
            "model_id"=> 103293,
            "position"=> "CB"
            ],
            [
            "id"=> 500,
            "name"=> "M. ACUÑA",
            "model_id"=> 103317,
            "position"=> "LMF"
            ],
            [
            "id"=> 501,
            "name"=> "M. ØDEGAARD",
            "model_id"=> 103404,
            "position"=> "AMF"
            ],
            [
            "id"=> 502,
            "name"=> "LUCAS VÁZQUEZ",
            "model_id"=> 103408,
            "position"=> "RWF"
            ],
            [
            "id"=> 503,
            "name"=> "M. CALDARA",
            "model_id"=> 103411,
            "position"=> "CB"
            ],
            [
            "id"=> 504,
            "name"=> "N. BARELLA",
            "model_id"=> 103686,
            "position"=> "CMF"
            ],
            [
            "id"=> 505,
            "name"=> "A. CHRISTENSEN",
            "model_id"=> 103845,
            "position"=> "CB"
            ],
            [
            "id"=> 506,
            "name"=> "DANI CEBALLOS",
            "model_id"=> 104710,
            "position"=> "CMF"
            ],
            [
            "id"=> 507,
            "name"=> "BRUNO HENRIQUE",
            "model_id"=> 106609,
            "position"=> "LWF"
            ],
            [
            "id"=> 508,
            "name"=> "V. TSYGANKOV",
            "model_id"=> 106778,
            "position"=> "RWF"
            ],
            [
            "id"=> 509,
            "name"=> "R. ZOBNIN",
            "model_id"=> 107338,
            "position"=> "CMF"
            ],
            [
            "id"=> 510,
            "name"=> "GELSON MARTINS",
            "model_id"=> 107639,
            "position"=> "RWF"
            ],
            [
            "id"=> 511,
            "name"=> "A. MIRANCHUK",
            "model_id"=> 107800,
            "position"=> "AMF"
            ],
            [
            "id"=> 512,
            "name"=> "F. KESSIÉ",
            "model_id"=> 107935,
            "position"=> "CMF"
            ],
            [
            "id"=> 513,
            "name"=> "E. ANDRADA",
            "model_id"=> 41555,
            "position"=> "GK"
            ],
            [
            "id"=> 514,
            "name"=> "V. ABOUBAKAR",
            "model_id"=> 42246,
            "position"=> "CF"
            ],
            [
            "id"=> 515,
            "name"=> "MARIO GASPAR",
            "model_id"=> 42466,
            "position"=> "RB"
            ],
            [
            "id"=> 516,
            "name"=> "K. MALCUIT",
            "model_id"=> 42588,
            "position"=> "RB"
            ],
            [
            "id"=> 517,
            "name"=> "T. STEPANENKO",
            "model_id"=> 42602,
            "position"=> "DMF"
            ],
            [
            "id"=> 518,
            "name"=> "K. GLIK",
            "model_id"=> 42647,
            "position"=> "CB"
            ],
            [
            "id"=> 519,
            "name"=> "M. LANZINI",
            "model_id"=> 42697,
            "position"=> "AMF"
            ],
            [
            "id"=> 520,
            "name"=> "G. RAMÍREZ",
            "model_id"=> 42894,
            "position"=> "AMF"
            ],
            [
            "id"=> 521,
            "name"=> "L. BENDER",
            "model_id"=> 43445,
            "position"=> "DMF"
            ],
            [
            "id"=> 522,
            "name"=> "D. VIDA",
            "model_id"=> 43540,
            "position"=> "CB"
            ],
            [
            "id"=> 523,
            "name"=> "FERNANDO",
            "model_id"=> 43786,
            "position"=> "DMF"
            ],
            [
            "id"=> 524,
            "name"=> "DANILO",
            "model_id"=> 43989,
            "position"=> "RB"
            ],
            [
            "id"=> 525,
            "name"=> "E. ZAHAVI",
            "model_id"=> 44043,
            "position"=> "CF"
            ],
            [
            "id"=> 526,
            "name"=> "JARDEL",
            "model_id"=> 44181,
            "position"=> "CB"
            ],
            [
            "id"=> 527,
            "name"=> "B. ANDRÉ",
            "model_id"=> 44527,
            "position"=> "CMF"
            ],
            [
            "id"=> 528,
            "name"=> "L. MURIEL",
            "model_id"=> 44636,
            "position"=> "CF"
            ],
            [
            "id"=> 529,
            "name"=> "R. BARKLEY",
            "model_id"=> 44702,
            "position"=> "AMF"
            ],
            [
            "id"=> 530,
            "name"=> "K. BELLARABI",
            "model_id"=> 44830,
            "position"=> "RMF"
            ],
            [
            "id"=> 531,
            "name"=> "K. ZOUMA",
            "model_id"=> 45076,
            "position"=> "CB"
            ],
            [
            "id"=> 532,
            "name"=> "K. LALA",
            "model_id"=> 45120,
            "position"=> "RB"
            ],
            [
            "id"=> 533,
            "name"=> "L. OCAMPOS",
            "model_id"=> 45255,
            "position"=> "LMF"
            ],
            [
            "id"=> 534,
            "name"=> "ÍÑIGO MARTÍNEZ",
            "model_id"=> 45290,
            "position"=> "CB"
            ],
            [
            "id"=> 535,
            "name"=> "M. DE SCIGLIO",
            "model_id"=> 45299,
            "position"=> "RB"
            ],
            [
            "id"=> 536,
            "name"=> "M. GRADEL",
            "model_id"=> 45320,
            "position"=> "LWF"
            ],
            [
            "id"=> 537,
            "name"=> "F. VÁZQUEZ",
            "model_id"=> 45334,
            "position"=> "AMF"
            ],
            [
            "id"=> 538,
            "name"=> "V. CUESTA",
            "model_id"=> 45575,
            "position"=> "CB"
            ],
            [
            "id"=> 539,
            "name"=> "G. CANO",
            "model_id"=> 45761,
            "position"=> "CF"
            ],
            [
            "id"=> 540,
            "name"=> "M. VECINO",
            "model_id"=> 45823,
            "position"=> "CMF"
            ],
            [
            "id"=> 541,
            "name"=> "A. MANDI",
            "model_id"=> 46466,
            "position"=> "CB"
            ],
            [
            "id"=> 542,
            "name"=> "R. FÄHRMANN",
            "model_id"=> 46648,
            "position"=> "GK"
            ],
            [
            "id"=> 543,
            "name"=> "ESCUDERO",
            "model_id"=> 46649,
            "position"=> "LB"
            ],
            [
            "id"=> 544,
            "name"=> "HUGO MALLO",
            "model_id"=> 46667,
            "position"=> "RB"
            ],
            [
            "id"=> 545,
            "name"=> "M. WEISER",
            "model_id"=> 46842,
            "position"=> "RB"
            ],
            [
            "id"=> 546,
            "name"=> "L. SHAW",
            "model_id"=> 47070,
            "position"=> "LB"
            ],
            [
            "id"=> 547,
            "name"=> "PEDRO GEROMEL",
            "model_id"=> 47348,
            "position"=> "CB"
            ],
            [
            "id"=> 548,
            "name"=> "D. ORIGI",
            "model_id"=> 47788,
            "position"=> "CF"
            ],
            [
            "id"=> 549,
            "name"=> "MANU TRIGUEROS",
            "model_id"=> 57352,
            "position"=> "CMF"
            ],
            [
            "id"=> 550,
            "name"=> "JEMERSON",
            "model_id"=> 58680,
            "position"=> "CB"
            ],
            [
            "id"=> 551,
            "name"=> "GABRIEL",
            "model_id"=> 58691,
            "position"=> "CB"
            ],
            [
            "id"=> 552,
            "name"=> "D. BERARDI",
            "model_id"=> 59481,
            "position"=> "RWF"
            ],
            [
            "id"=> 553,
            "name"=> "L. PAVOLETTI",
            "model_id"=> 59484,
            "position"=> "CF"
            ],
            [
            "id"=> 554,
            "name"=> "Y. TIELEMANS",
            "model_id"=> 59801,
            "position"=> "CMF"
            ],
            [
            "id"=> 555,
            "name"=> "A. SAMARIS",
            "model_id"=> 59817,
            "position"=> "DMF"
            ],
            [
            "id"=> 556,
            "name"=> "F. SMOLOV",
            "model_id"=> 59947,
            "position"=> "CF"
            ],
            [
            "id"=> 557,
            "name"=> "J. KING",
            "model_id"=> 59959,
            "position"=> "CF"
            ],
            [
            "id"=> 558,
            "name"=> "J. HENDRIX",
            "model_id"=> 60844,
            "position"=> "DMF"
            ],
            [
            "id"=> 559,
            "name"=> "J. SERI",
            "model_id"=> 60847,
            "position"=> "CMF"
            ],
            [
            "id"=> 560,
            "name"=> "B. TRAORÉ",
            "model_id"=> 60922,
            "position"=> "RWF"
            ],
            [
            "id"=> 561,
            "name"=> "N. BENTALEB",
            "model_id"=> 61183,
            "position"=> "CMF"
            ],
            [
            "id"=> 562,
            "name"=> "Y. MINA",
            "model_id"=> 61468,
            "position"=> "CB"
            ],
            [
            "id"=> 563,
            "name"=> "Y. GAZINSKIY",
            "model_id"=> 61675,
            "position"=> "CMF"
            ],
            [
            "id"=> 564,
            "name"=> "IAGO FALQUÉ",
            "model_id"=> 63322,
            "position"=> "RWF"
            ],
            [
            "id"=> 565,
            "name"=> "YURI",
            "model_id"=> 100224,
            "position"=> "LB"
            ],
            [
            "id"=> 566,
            "name"=> "W. CYPRIEN",
            "model_id"=> 100497,
            "position"=> "CMF"
            ],
            [
            "id"=> 567,
            "name"=> "G. DEFREL",
            "model_id"=> 100709,
            "position"=> "CF"
            ],
            [
            "id"=> 568,
            "name"=> "M. BERG",
            "model_id"=> 100992,
            "position"=> "CF"
            ],
            [
            "id"=> 569,
            "name"=> "R. FRASER",
            "model_id"=> 101784,
            "position"=> "LMF"
            ],
            [
            "id"=> 570,
            "name"=> "T. SAVANIER",
            "model_id"=> 102483,
            "position"=> "CMF"
            ],
            [
            "id"=> 571,
            "name"=> "K. TOKO EKAMBI",
            "model_id"=> 102695,
            "position"=> "CF"
            ],
            [
            "id"=> 572,
            "name"=> "M. LOPEZ",
            "model_id"=> 102840,
            "position"=> "CMF"
            ],
            [
            "id"=> 573,
            "name"=> "J. ANDERSEN",
            "model_id"=> 103551,
            "position"=> "CB"
            ],
            [
            "id"=> 574,
            "name"=> "L. DUBOIS",
            "model_id"=> 104271,
            "position"=> "RB"
            ],
            [
            "id"=> 575,
            "name"=> "V. RONGIER",
            "model_id"=> 104277,
            "position"=> "CMF"
            ],
            [
            "id"=> 576,
            "name"=> "J. BAMBA",
            "model_id"=> 104295,
            "position"=> "LWF"
            ],
            [
            "id"=> 577,
            "name"=> "N. NÁNDEZ",
            "model_id"=> 104594,
            "position"=> "CMF"
            ],
            [
            "id"=> 578,
            "name"=> "E. BAILLY",
            "model_id"=> 104647,
            "position"=> "CB"
            ],
            [
            "id"=> 579,
            "name"=> "A. IWOBI",
            "model_id"=> 106410,
            "position"=> "LMF"
            ],
            [
            "id"=> 580,
            "name"=> "JOELINTON",
            "model_id"=> 106636,
            "position"=> "CF"
            ],
            [
            "id"=> 581,
            "name"=> "M. MAREGA",
            "model_id"=> 107469,
            "position"=> "SS"
            ],
            [
            "id"=> 582,
            "name"=> "L. TOUSART",
            "model_id"=> 108218,
            "position"=> "DMF"
            ],
            [
            "id"=> 583,
            "name"=> "PEDRAZA",
            "model_id"=> 108380,
            "position"=> "LMF"
            ],
            [
            "id"=> 584,
            "name"=> "JÚNIOR MORAES",
            "model_id"=> 108807,
            "position"=> "CF"
            ],
            [
            "id"=> 585,
            "name"=> "K. TRAPP",
            "model_id"=> 109010,
            "position"=> "GK"
            ],
            [
            "id"=> 586,
            "name"=> "ANDRÉ SILVA",
            "model_id"=> 109343,
            "position"=> "CF"
            ],
            [
            "id"=> 587,
            "name"=> "I. DIOP",
            "model_id"=> 110645,
            "position"=> "CB"
            ],
            [
            "id"=> 588,
            "name"=> "M. DÍAZ",
            "model_id"=> 111343,
            "position"=> "CF"
            ],
            [
            "id"=> 589,
            "name"=> "CARLOS SOLER",
            "model_id"=> 112015,
            "position"=> "RMF"
            ],
            [
            "id"=> 590,
            "name"=> "C. PULISIC",
            "model_id"=> 112104,
            "position"=> "RWF"
            ],
            [
            "id"=> 591,
            "name"=> "O. ZINCHENKO",
            "model_id"=> 113340,
            "position"=> "LB"
            ],
            [
            "id"=> 592,
            "name"=> "J. MADDISON",
            "model_id"=> 114036,
            "position"=> "AMF"
            ],
            [
            "id"=> 593,
            "name"=> "A. WAN-BISSAKA",
            "model_id"=> 114876,
            "position"=> "RB"
            ],
            [
            "id"=> 594,
            "name"=> "V. CLAESSON",
            "model_id"=> 116226,
            "position"=> "LMF"
            ],
            [
            "id"=> 595,
            "name"=> "A. EROKHIN",
            "model_id"=> 116363,
            "position"=> "CMF"
            ],
            [
            "id"=> 596,
            "name"=> "M. SAMATTA",
            "model_id"=> 119694,
            "position"=> "CF"
            ],
            [
            "id"=> 597,
            "name"=> "JUNIOR FIRPO",
            "model_id"=> 121314,
            "position"=> "LB"
            ],
            [
            "id"=> 598,
            "name"=> "A. MARTYNOVICH",
            "model_id"=> 122111,
            "position"=> "CB"
            ],
            [
            "id"=> 599,
            "name"=> "XAVI",
            "model_id"=> 1073742690,
            "position"=> "CMF"
            ],
            [
            "id"=> 600,
            "name"=> "B. GOMIS",
            "model_id"=> 1073750531,
            "position"=> "CF"
            ],
            [
            "id"=> 601,
            "name"=> "RENATO AUGUSTO",
            "model_id"=> 1073781039,
            "position"=> "CMF"
            ],
            [
            "id"=> 602,
            "name"=> "SOUZA",
            "model_id"=> 1073784167,
            "position"=> "DMF"
            ],
            [
            "id"=> 603,
            "name"=> "A. MIRANTE",
            "model_id"=> 5428,
            "position"=> "GK"
            ],
            [
            "id"=> 604,
            "name"=> "J. PINOLA",
            "model_id"=> 5538,
            "position"=> "CB"
            ],
            [
            "id"=> 605,
            "name"=> "M. RODRÍGUEZ",
            "model_id"=> 7255,
            "position"=> "LWF"
            ],
            [
            "id"=> 606,
            "name"=> "FRED",
            "model_id"=> 9144,
            "position"=> "CF"
            ]
        ];

        foreach($models as $model){
            
            DB::table('playermodels')->insert([
                'name'=>$model['name'],
                'model_id'=>$model['model_id'],
                'position'=>$model['position'],

            ]);

        }
    }
}
