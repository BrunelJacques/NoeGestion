# Recueil de fonctions diversesimport datetime
import datetime
import unicodedata
import re

from outils.xconst import *


# Conversion des dates

def DateToDatetime(date_):
    # FmtDate normalise en FR puis retourne en datetime
    frdate = DateToFr(date_)
    return DateFrToDatetime(frdate)


def DateToFr(date_):
    # date multi origine, la retourne en format FR
    strdate = ''
    strheure = None
    if isinstance(date_, str):
        lstdte = date_.split(' ')
        if len(lstdte) > 1:
            # l'espace dans une date est censé représenter une heure
            date_ = lstdte[0]
            strheure = lstdte[1]
    if date_ == None or date_ in ('', datetime.date(1900, 1, 1), "1899-12-30"):
        strdate = ''
    elif isinstance(date_, str):
        date_ = date_.strip()
        tplansi = date_.split('-')
        tpldate = date_.split('/')
        if date_ == '00:00:00':
            strdate = ''
        elif len(tplansi) == 3:
            # format ansi classique
            tpltpl2 = tplansi[2].split(' ')
            strdate = ('00' + tpltpl2[0])[-2:] \
                      + '/' + ('00' + tplansi[1])[-2:] \
                      + '/' + ('20' + tplansi[0])[-4:] + tplansi[2][len(tpltpl2[0]):]
        elif len(tpldate) == 3:
            # format fr avec millenaire
            if len(date_) > 8:
                strdate = ('00' + tpldate[0])[-2:] + '/' + ('00' + tpldate[1])[-2:] + '/' + (tpldate[2])[:4]
            # format fr sans millenaire
            else:
                strdate = ('00' + tpldate[0])[-2:] + '/' + ('00' + tpldate[1])[-2:] + '/' + ('20' + tpldate[2])[:4]
        elif len(date_) == 6:
            # sans séparateurs ni millenaire
            strdate = date_[:2] + '/' + date_[2:4] + '/' + ('20' + date_[-2:])
        elif len(date_) == 8:
            # sans séparateur et avec millenaire jjmmaaaaa
            strdate = date_[:2] + '/' + date_[2:4] + '/' + date_[-4:]
    elif isinstance(date_, datetime.date):
        strdate = datetime_to_str(date_)
    elif isinstance(date_, int):
        # format nombre aaaammjj
        date_ = str(date_)
        strdate = date_[-2:] + '/' + date_[4:6] + '/' + date_[:4]
    if strheure:
        strdate += " %s" % strheure
    return strdate


def DateToIso(date_):
    datefr = DateToFr(date_)
    return DateFrToIso(datefr)


def DateFrToIso(datefr):
    if not datefr: return ''
    # Conversion de date française reçue en ISO
    if not isinstance(datefr, str): datefr = str(datefr)
    datefr = datefr.strip()  # normalisation des formats divers
    tpldate = datefr.split('/')
    if len(tpldate) != 3:
        return ''
    # format fr avec millenaire
    if len(datefr) > 8:
        tpltpl2 = tpldate[2].split(' ')
        strdate = (
                ('20' + tpltpl2[0])[-4:]
                + '-' + ('00' + tpldate[1])[-2:]
                + '-' + ('00' + tpldate[0])[-2:]
                + tpldate[2][len(tpltpl2[0]):]
        )
    # format fr sans millenaire
    else:
        strdate = (
                ('20' + tpldate[2])[:4]
                + '-' + ('00' + tpldate[1])[-2:]
                + '-' + ('00' + tpldate[0])[-2:]
        )
    return strdate


def DatetimeToIso(date_):
    return datetime_to_str(date_, iso=True)


def DateFrToDatetime(datefr):
    # Conversion de date française jj/mm/aaaa (ou déjà en datetime) en datetime
    deltaheure = None
    if isinstance(datefr, str):
        lstdte = datefr.split(' ')
        if len(lstdte) > 1:
            # l'espace dans une date est censé représenter une heure
            datefr = lstdte[0]
            lheure = [int(x) for x in lstdte[1].split(':')]
            deltaheure = datetime.timedelta(hours=lheure[0], minutes=lheure[1])
    if datefr == None or datefr == '':
        return None
    elif isinstance(datefr, str) and len(datefr) >= 10:
        # date avec millésime complet
        dtretour = datetime.date(int(datefr[6:10]),
                                 int(datefr[3:5]),
                                 int(datefr[:2]))
        if deltaheure:
            dtretour = datetime.datetime(dtretour.year,
                                         dtretour.month,
                                         dtretour.day) + deltaheure
        return dtretour
    elif isinstance(datefr, datetime.date):
        return datefr


def datetime_to_str(dte, iso=False):
    # Conversion d'une date datetime en chaîne
    deltaheure = ''
    if isinstance(dte, datetime.date):
        dd = ("00" + str(dte.day))[-2:]
        mm = ("00" + str(dte.month))[-2:]
        yyyy = ("0000" + str(dte.year))[-4:]
        if isinstance(dte, datetime.datetime):
            hh = dte.hour
            mn = dte.minute
            deltaheure = datetime.timedelta(hours=hh, minutes=mn)
            if hh + mn > 0:
                deltaheure = ' %s:%s' % (("00" + str(hh))[-2:],
                                         ("00" + str(mn))[-2:])
        if iso:
            return "%s-%s-%s" % (yyyy, mm, dd) + deltaheure
        else:
            return "%s/%s/%s" % (dd, mm, yyyy) + deltaheure
    else:
        return str(dte)


def DateComplete(dateDD):
    """ Transforme une date DD en date complète : Ex : Lundi 15 janvier 2008 """

    listeJours = LISTE_JOURS

    listeMois = LISTE_MOIS
    dateComplete = listeJours[dateDD.weekday()] \
                   + " " \
                   + str(dateDD.day) \
                   + " " \
                   + listeMois[dateDD.month - 1].lower() \
                   + " " \
                   + str(dateDD.year)
    return dateComplete


def calcul_age(date_reference: datetime.date = datetime.date.today(), date_naiss: datetime.date = None) -> int:
    """ Calcul de l'age de la personne

    Args:
        date_reference (datetime.date):
        date_naiss (datetime.date):
    """
    if date_naiss in (None, ""):
        return None
    age = (date_reference.year - date_naiss.year) - int(
        (date_reference.month, date_reference.day) < (date_naiss.month, date_naiss.day))
    return age


def DecaleDateSql(dateIso, nbj=-1, iso=True):
    dt = DateToDatetime(dateIso) + datetime.timedelta(days=nbj)
    return datetime_to_str(dt, iso)


def DecaleDateTime(date, nbj=-1):
    return DateToDatetime(date) + datetime.timedelta(days=nbj)


def PeriodeMois(date_):
    # retourne tuple de début et fin de mois dans format de date_
    debut = DebutDeMois(date_)
    fin = FinDeMois(date_)
    return (debut, fin)


def FinDeMois(date_):
    # Retourne le dernier jour du mois dans le format reçu
    deltaheure = None
    if not isinstance(date_, (datetime.date, datetime.datetime)):
        dtdate = DateToDatetime(date_)
    else:
        dtdate = date_
    # calcul fin de mois
    if isinstance(dtdate, datetime.date):
        if isinstance(dtdate, datetime.datetime):
            deltaheure = datetime.timedelta(hours=24, minutes=00, seconds=-1)
        if dtdate.day < 16:
            nbj = 31
        else:
            nbj = 16
        # avance de nbj jours puis recule de 1 au début du nouveau mois
        dtretour = dtdate + datetime.timedelta(days=nbj)
        dtretour = DebutDeMois(dtretour)
        dtretour -= datetime.timedelta(days=1)
        if deltaheure:
            dtretour += deltaheure
    else:
        # echec
        raise Exception("Fin de mois non trouvé pour %s" % str(date_))
    if isinstance(date_, str):
        lstdte = date_.split(' ')
        if len(lstdte) > 1:
            # l'espace dans une date est censé représenter une heure
            deltaheure = ' 23:59:59'
        else:
            deltaheure = ''

        if len(date_.split('/')) == 3:
            dtretour = datetime_to_str(dtretour) + deltaheure
        elif len(date_.split(('-'))) == 3:
            dtretour = DatetimeToIso(dtretour) + deltaheure
    return dtretour


def DebutDeMois(date_):
    # Retourne le premier jour du mois dans le format reçu
    if not isinstance(date_, (datetime.date, datetime.datetime)):
        dtdate = DateToDatetime(date_)
    else:
        dtdate = date_

    # calcul début mois
    if isinstance(dtdate, datetime.date):
        if isinstance(dtdate, datetime.datetime):
            dtretour = datetime.datetime(dtdate.year, dtdate.month, 1)
        else:
            dtretour = datetime.date(dtdate.year, dtdate.month, 1)
    else:
        # echec
        raise Exception("Début de mois non trouvé pour %s" % str(date_))

    # retour dans le format d'arrivée
    if isinstance(date_, str):
        if len(date_.split('/')) == 3:
            dtretour = datetime_to_str(dtretour)
        elif len(date_.split(('-'))) == 3:
            dtretour = DatetimeToIso(dtretour)
    return dtretour


# Formatages de champs --------------------------------------------------------

def FmtDecimal(montant):
    if isinstance(montant, str): montant = montant.replace(',', '.')
    if isinstance(montant, str): montant = montant.replace(' ', '')
    if montant == None or montant == '' or float(montant) == 0:
        return ""
    strMtt = '{:,.2f} '.format(float(montant))
    strMtt = strMtt.replace(',', ' ')
    return strMtt


def FmtQte(nombre):
    if isinstance(nombre, str):
        nombre = nombre.replace(',', '.')
    nombre = str(nombre)
    try:
        x = float(nombre)
    except:
        return ""
    if nombre == None or nombre == '' or float(nombre) == 0.0:
        return ""
    lstNb = nombre.split('.')
    if len(lstNb) == 2:
        nombre = lstNb[0] + '.' + lstNb[1][:2]
    return nombre


def FmtInt(montant):
    if isinstance(montant, str):
        montant = montant.replace(',', '.')
    try:
        x = float(montant)
    except:
        return ""
    if montant == None or montant == '' or float(montant) == 0:
        return ""
    strMtt = '{:,.0f} '.format(int(float(montant)))
    strMtt = strMtt.replace(',', ' ')
    return strMtt


def FmtIntNoSpce(montant):
    if isinstance(montant, str):
        montant = montant.replace(',', '.')
    try:
        x = float(montant)
    except:
        return ""
    if montant == None or montant == '' or float(montant) == 0:
        return ""
    strMtt = '{:.0f} '.format(int(float(montant)))
    return strMtt.strip()


def FmtPercent(montant):
    if isinstance(montant, str): montant = montant.replace(',', '.')
    if montant == None or montant == '' or float(montant) == 0:
        return ""
    strMtt = '{:}% '.format(int(float(montant)))
    return strMtt


def FmtDate(date):
    return DateToFr(date)


def FmtBool(value):
    if value == False:
        return 'N'
    if value == True:
        return 'O'
    return ''


def FmtBoolX(value):
    if value == True:
        return 'X'
    return ''


def FmtMontant(montant, prec=2, lg=None):
    out = ''
    if isinstance(montant, str):
        montant = montant.replace(',', '.')
        try:
            montant = float(montant)
        except:
            pass
    if not isinstance(montant, (int, float)): montant = 0.0
    if float(montant) != 0.0:
        out = "{: ,.{prec}f} {:} ".format(montant, SYMBOLE, prec=prec).replace(',', ' ')
    if lg:
        out = (' ' * lg + out)[-lg:]
    return out


def FmtSolde(montant):
    if isinstance(montant, str): montant = montant.replace(',', '.')
    if montant == None or montant == '':
        return ""
    strMtt = '{:+,.2f} '.format(float(montant))
    strMtt = strMtt.replace(',', ' ') + SYMBOLE
    return strMtt


# Formatage de textes
def EscapeQuote(txt, quote="'"):
    if not isinstance(txt, str):
        return txt
    for car in quote:
        if car in txt:
            txt = txt.replace(car, "\%s" % car)
    return txt


def NoPunctuation(txt='', punct="'!\"#$%&()*+,-./:;<=>?@[]^_`{|}~"):
    regex = re.compile('[%s]' % re.escape(punct))
    return regex.sub(' ', txt)


def NoLettre(txt=''):
    if isinstance(txt, str):
        chiffres = "0123456789.,-+"
        newtxt = ''
        for a in txt:
            if a in chiffres:
                newtxt += a
        txt = newtxt
        txt = txt.replace(',', '.')
    return txt


def NoAccents(texte, lower=True):
    # met en minuscule sans accents et sans caractères spéciaux
    code = ''.join(c for c in unicodedata.normalize('NFD', texte) if unicodedata.category(c) != 'Mn')
    # ("é", "e"), ("è", "e"), ("ê", "e"), ("ë", "e"), ("à", "a"), ("û", ""), ("ô", "o"), ("ç", "c"), ("î", "i"), ("ï", "i")

    if lower: code = code.lower()
    code = ''.join(car for car in code if car not in " %)(.[]',;/\n")
    return code


# Diverses fonctions-------------------------------------------------------------------------------------------

def Nz(param):
    # fonction Null devient zero, et extrait les chiffres d'une chaîne pour faire un nombre
    if isinstance(param, str):
        tmp = ''
        for x in param:
            if (ord(x) > 42 and ord(x) < 58):
                tmp += x
        tmp = tmp.replace(',', '.')
        lstval = tmp.split('.')
        if len(lstval) >= 2: tmp = lstval[0] + '.' + lstval[1]
        param = tmp
    if isinstance(param, int):
        valeur = param
    else:
        try:
            valeur = float(param)
        except:
            valeur = 0.0
    return valeur


def MoyPond(ltXY):
    # moyenne pondérée d'une liste de couples de valeurs, renvoie la moyennePondérée des Y
    sumX = 0
    sumXY = 0
    moyY = 0.0
    for x, y in ltXY:
        sumX += x
        sumXY += y
    if sumX != 0:
        moyY = sumXY / sumX
    return moyY


def ListTuplesToDict(lstTuples):
    dict = {}
    if isinstance(lstTuples, list):
        for cle, don in lstTuples:
            dict[cle] = don
    return dict


def ListToDict(lstCles, lstValeurs):
    dict = {}
    if isinstance(lstCles, list):
        for cle in lstCles:
            idx = lstCles.index(cle)
            dict[cle] = None
            if isinstance(lstValeurs, (list, tuple)) and len(lstValeurs) >= idx:
                dict[cle] = lstValeurs[idx]
    return dict


def DictToList(dic):
    # sépare les clés et les valeurs d'un dictionnaire
    lstCles = []
    lstValeurs = []
    if isinstance(dic, dict):
        for cle, valeur in dic.items():
            # cas des dictionnaires dans dictionnaires, le premier niveau est ignoré
            if isinstance(valeur, dict):
                sscles, ssval = DictToList(valeur)
                lstCles += sscles
                lstValeurs += ssval
            else:
                lstCles.append(cle)
                lstValeurs.append(valeur)
    return lstCles, lstValeurs


def DeepCopy(data):
    if isinstance(data, (dict)):
        return _CopyDic(data)
    if isinstance(data, (list, tuple)):
        data2 = [DeepCopy(x) for x in data]
        if isinstance(data, tuple):
            data2 = tuple(data2)
        return data2
    return data


def _CopyDic(dic):
    # deepcopy d'un dictionnaire
    dic2 = {}
    for key, data in dic.items():
        # traitement de la clé
        if isinstance(key, (list, tuple)):
            key2 = [x for x in key]
            if isinstance(key, tuple):
                key2 = tuple(key2)
        else:
            key2 = key
        # traitement de data
        dic2[key2] = DeepCopy(data)
    return dic2


def PrefixeNbre(param):
    if not isinstance(param, str):
        return ''
    # extrait le préfixe chaîne d'un nombre
    radicalNbre = str(Nz(param))
    ix = len(param)
    if radicalNbre != '0.0':
        ix = param.find(radicalNbre[0])
    return param[:ix]


def LettreSuivante(lettre=''):
    # incrémentation d'un lettrage
    if not isinstance(lettre, str):
        lettre = 'A'
    if lettre == '':
        lettre = 'A'
    lastcar = lettre[-1]
    precars = lettre[:-1]
    if ord(lastcar) in (90, 122):
        if len(precars) == 0:
            precars = chr(ord(lastcar) - 25)
        else:
            precars = LettreSuivante(precars)
        new = precars + chr(ord(lastcar) - 25)
    else:
        new = precars + chr(ord(lastcar) + 1)
    return new


def IncrementeRef(ref):
    # incrémente une référence compteur constituée d'un préfixe avec un quasi-nombre ou pas
    pref = PrefixeNbre(ref)
    if len(ref) > len(pref):
        nbre = int(Nz(ref)) + 1
        lgnbre = len(str(nbre))
        nbrstr = '0' * lgnbre + str(nbre)
        refout = pref + nbrstr[-lgnbre:]
    else:
        # référence type lettrage
        refout = LettreSuivante(ref)
    return refout


def ProrataCommercial(entree, sortie, debutex, finex):
    # Prorata d'une présence sur exercice sur la base d'une année commerciale pour un bien entré et sorti
    # normalisation des dates iso en datetime
    [entree, sortie, debut, fin] = [DateToDatetime(x) for x in [entree, sortie, debutex, finex]]
    if not debut or not fin:
        mess = "Date d'exercices impossibles: du '%s' au '%s'!" % (str(debutex), str(finex))
        raise Exception(mess)
    # détermination de la période d'amortissement
    if not entree: entree = debut
    if not sortie: sortie = fin
    if entree > fin:
        debutAm = fin
    elif entree > debut:
        debutAm = entree
    else:
        debutAm = debut
    if sortie < debut:
        finAm = debut
    elif sortie < fin:
        finAm = sortie
    else:
        finAm = fin

    def delta360(deb, fin):
        # nombre de jours d'écart en base 360jours / an
        def jour30(dte):
            # arrondi fin de mois en mode 30 jours
            if dte.day > 30:
                return 30
            # le lendemain est-il un changement de mois? pour fin février bissextile ou pas
            fdm = (dte + datetime.timedelta(days=1)).month - dte.month
            if fdm > 0:
                return 30
            return dte.day

        return 1 + jour30(fin) - jour30(deb) + ((fin.month - deb.month) + ((fin.year - deb.year) * 12)) * 30

    taux = round(delta360(debutAm, finAm) / 360, 6)
    return taux


if __name__ == '__main__':
    import os

    os.chdir("../appli_python")
    """
    print(FmtDecimal(1230.05189),FmtDecimal(-1230.05189),FmtDecimal(0))
    print(FmtSolde(8520.547),FmtSolde(-8520.547),FmtSolde(0))
    print(FmtMontant(8520.547),FmtMontant(-8520.547),FmtMontant(0))
    print(FmtDate('01022019'))
    print(NoAccents("ÊLève!"))
    print(FmtTelephone('0494149367'))
    print(DateToIso('21-02-14'))
    dt = FinDeMois(datetime.date.today())
    """

    txt = EscapeQuote("bonjour!'!\"#$%&()*+,-./:;<=>?@[]^_`{|}~")
    print("'!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'")
    print(txt)
