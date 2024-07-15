<?php

namespace App\Controller\Admin;

use App\Entity\Document;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Vich\UploaderBundle\Form\Type\VichFileType;

class DocumentCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Document::class;
    }

    public function createEntity(string $entityFqcn)
    {
        $user = $this->getUser();
        assert($user instanceof User);
        return new Document($user);
    }

//    COMMENTED BECAUSE NICE TO HAVE FOR TESTING
//    public function configureActions(Actions $actions): Actions
//    {
//        return $actions
//        ->disable(Action::NEW);
//    }

    public function configureFields(string $pageName): iterable
    {
        yield TextField::new('name');
        yield DateTimeField::new('createDate')
        ->hideOnForm();
        yield DateTimeField::new('updateDate')
        ->hideOnForm();
        yield AssociationField::new('course')
            ->autocomplete();
        yield AssociationField::new('category')
        ->autocomplete();
        yield BooleanField::new('under_review')
            ->setLabel('Published')
            ->renderAsSwitch(false);
        yield TextField::new('file')
            ->setFormType(VichFileType::class)
            ->setFormTypeOptions([
                'download_label' => true,
                'allow_delete' => false,
            ])
            ->hideOnIndex();
        yield TextField::new('file_name')
            ->onlyOnIndex();
    }
}
