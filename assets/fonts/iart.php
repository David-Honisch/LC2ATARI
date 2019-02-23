<?php
//Höhe
$width = $_REQUEST['width'];
if ($width == "")
	$width = 640;
//Höhe
$height = $_REQUEST['height'];
if ($height == "")
	$height = 480;
//Requested Image wird geladen...
$rimage = $_REQUEST['rimage'];
if ($rimage == "")
{
	$rimage = "./images/t.gif";
}else
{
	$rimage = "./images/content/".$rimage;
}
//Text	
$text = $_REQUEST['text'];
if ($text == "")
	$text = "Picture";

if ($_REQUEST['img'] != 1) {
?>
<?php //echo $TEXT['iart-head']; ?>
		<img width="<? echo $width; ?>" height="<? echo $height; ?>" src="/?q=cimage&img=1&text=<? echo urlencode($text); ?>" alt="<? echo urlencode($text); ?>">
<?php
	exit;
}

$fontfile = "./font/Arial.TTF";
$size = 100;
$h = $height;
$w = $width;
$im = ImageCreate($w, $h);
//$image1 = imagecreatefromgif("images/logo_leitz.gif");

//$image1 = imagecreatefromgif($rimage);
//imagecopyresized($im, $image1, 0,0, 0,0,$w+1200,$h+1200,$w,$h);

$fill = ImageColorAllocate($im, 255, 255, 255);
$light = ImageColorAllocate($im, 255, 255, 255);
$corners = ImageColorAllocate($im, 255, 255, 255);
$dark = ImageColorAllocate($im, 51, 51, 0);
$black = ImageColorAllocate($im, 0, 0, 0);

$colors[1] = ImageColorAllocate($im, 255, 255, 255);
$colors[2] = ImageColorAllocate($im, 255 * 0.95, 255 * 0.95, 255 * 0.95);
$colors[3] = ImageColorAllocate($im, 255 * 0.9, 255 * 0.9, 255 * 0.9);
$colors[4] = ImageColorAllocate($im, 255 * 0.85, 255 * 0.85, 255 * 0.85);
header("Content-Type: image/png");
ImageTTFText($im, $size, 0, 30, 200, $black, $fontfile, $_GET['text']);
//srand(time());
//$c = 1;
//$anz = 10;
//$step = (4 / $anz);
//for ($i = 0; $i < $anz; $i += 1) {
//	$size = rand(7, 40);
//	$x = rand(-390, 390);
//	$y = rand(-100, 400);
//	$color = $colors[$c];
//	$c += $step;
//	ImageTTFText($im, $size, 0, $x, $y, $colors[$c], $fontfile, $_GET['text']);
//}
//Schreib in das Bild
//ImageTTFText($im, $size, 0, 10, 100, $black, $fontfile, $_GET['text']);
//ImageLine($im, 0, 0, $w -1, 0, $light);
//ImageLine($im, 0, 0, 0, $h -2, $light);
//ImageLine($im, $w -1, 0, $w -1, $h, $dark);
//ImageLine($im, 0, $h -1, $w -1, $h -1, $dark);
//ImageSetPixel($im, 0, $h -1, $corners);
//ImageSetPixel($im, $w -1, 0, $corners);
//$image1 = imagecreatefromgif("images/t.gif");
//imagecopyresized($im, $image1, 0,0, 0,0,80,60,80,60);
//ImageTTFText($im, $size, 0, $x, $y, $black, $fontfile, $_GET['text']);

ImagePNG($im);
exit;
?>
