<?php

namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\CourseComment;
use App\State\EntityClassDtoStateProcessor;
use App\State\EntityClassDtoStateProvider;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    shortName: 'Course Comment',
    operations: [
        new Get(),
        new GetCollection(),
        new Patch(),
        new Post(),
        new Delete(),
    ],
    provider: EntityClassDtoStateProvider::class,
    processor: EntityClassDtoStateProcessor::class,
    stateOptions: new Options(entityClass: CourseComment::class),
)]
class CourseCommentApi
{
    #[ApiProperty(readable: false, writable: false, identifier: true)]
    public ?int $id = null;

    #[Assert\NotBlank]
    #[ApiFilter(SearchFilter::class, strategy: 'ipartial')]
    public ?string $content = null;

    #[ApiFilter(BooleanFilter::class)]
    public bool $anonymous;

    public ?CourseApi $course;

    public ?CommentCategoryApi $category;

    // TODO add creator when UserApi exists
//    public ?UserApi $creator;

    #[ApiProperty(writable: false)]
    public string $createdAt;

    #[ApiProperty(writable: false)]
    public string $updatedAt;
}
